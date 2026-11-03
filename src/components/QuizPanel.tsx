import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  AdminLevel,
  CountryAdministrativeData,
  MacroRegion,
  Municipality,
  SubDivision,
} from '../types/geo';
import { playSuccessSound, playFailureSound } from '../utils/sound';
import {
  Trophy,
  Flame,
  Clock,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
} from 'lucide-react';

interface QuizQuestion {
  level: AdminLevel;
  targetId: string;
  name: string;
  nameEn: string;
  parentName?: string;
  hintText: string;
}

interface QuizPanelProps {
  country: CountryAdministrativeData;
  onClose: () => void;
  onSetQuizTarget: (
    target: { level: AdminLevel; id: string; name: string } | null
  ) => void;
  incomingAnswer: {
    clickedId: string;
    level: AdminLevel;
  } | null;
  onFeedback: (feedback: { correct: boolean; id: string } | null) => void;
}

export const QuizPanel: React.FC<QuizPanelProps> = ({
  country,
  onClose,
  onSetQuizTarget,
  incomingAnswer,
  onFeedback,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<AdminLevel | 'all'>(2);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answerLog, setAnswerLog] = useState<
    { question: QuizQuestion; correct: boolean }[]
  >([]);

  // Build question pool
  const generateQuestions = (levelChoice: AdminLevel | 'all') => {
    const pool: QuizQuestion[] = [];

    // Level 1: Macro regions
    if (levelChoice === 1 || levelChoice === 'all') {
      country.macroRegions.forEach((m) => {
        pool.push({
          level: 1,
          targetId: m.id,
          name: m.name,
          nameEn: m.nameEn,
          hintText: `${country.name}の第1階層広域ブロック。${m.description.slice(0, 35)}...`,
        });
      });
    }

    // Level 2: Subdivisions
    if (levelChoice === 2 || levelChoice === 'all') {
      country.subDivisions.forEach((sub) => {
        const parentMacro = country.macroRegions.find(
          (m) => m.id === sub.macroRegionId
        );
        pool.push({
          level: 2,
          targetId: sub.id,
          name: sub.name,
          nameEn: sub.nameEn,
          parentName: parentMacro?.name,
          hintText: `州都/県庁所在地: ${sub.capitalCity}。所属広域圏: ${
            parentMacro?.name || ''
          }`,
        });
      });
    }

    // Level 3: Municipalities
    if (levelChoice === 3 || levelChoice === 'all') {
      country.subDivisions.forEach((sub) => {
        // 出題対象は共通基準を満たす Tier A の都市のみ（Tier B は国別の補助枠）
        sub.municipalities.filter((m) => m.tier !== 'B').forEach((m) => {
          pool.push({
            level: 3,
            targetId: m.id,
            name: m.name,
            nameEn: m.nameEn,
            parentName: sub.name,
            hintText: `所属する第2階層: ${sub.name} (県庁/州都: ${sub.capitalCity})`,
          });
        });
      });
    }

    // Shuffle and pick 10
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    return shuffled;
  };

  // Start new quiz round
  const startNewQuiz = (levelChoice = selectedLevel) => {
    const newQuestions = generateQuestions(levelChoice);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setShowHint(false);
    setQuizFinished(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setAnswerLog([]);

    if (newQuestions.length > 0) {
      onSetQuizTarget({
        level: newQuestions[0].level,
        id: newQuestions[0].targetId,
        name: newQuestions[0].name,
      });
    }
  };

  // Initial mount or country change
  useEffect(() => {
    startNewQuiz(selectedLevel);
    return () => {
      onSetQuizTarget(null);
      onFeedback(null);
    };
  }, [country.id, selectedLevel]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !quizFinished) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, quizFinished]);

  // Handle incoming answer from Map click
  useEffect(() => {
    if (!incomingAnswer || quizFinished || questions.length === 0) return;

    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const isMatch =
      incomingAnswer.level === currentQ.level &&
      incomingAnswer.clickedId === currentQ.targetId;

    if (isMatch) {
      // Correct!
      playSuccessSound();
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      onFeedback({ correct: true, id: currentQ.targetId });

      // Trigger Confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}

      setAnswerLog((prev) => [...prev, { question: currentQ, correct: true }]);
    } else {
      // Incorrect
      playFailureSound();
      setStreak(0);
      onFeedback({ correct: false, id: incomingAnswer.clickedId });
      setAnswerLog((prev) => [...prev, { question: currentQ, correct: false }]);
    }

    // Advance to next question after small delay
    setTimeout(() => {
      onFeedback(null);
      setShowHint(false);
      if (currentIndex + 1 < questions.length) {
        const nextQ = questions[currentIndex + 1];
        setCurrentIndex((prev) => prev + 1);
        onSetQuizTarget({
          level: nextQ.level,
          id: nextQ.targetId,
          name: nextQ.name,
        });
      } else {
        // Quiz complete!
        setIsTimerRunning(false);
        setQuizFinished(true);
        onSetQuizTarget(null);
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch {}
      }
    }, 700);
  }, [incomingAnswer]);

  const currentQ = questions[currentIndex];

  const handleSkip = () => {
    if (!currentQ || quizFinished) return;
    setStreak(0);
    setAnswerLog((prev) => [...prev, { question: currentQ, correct: false }]);
    setShowHint(false);

    if (currentIndex + 1 < questions.length) {
      const nextQ = questions[currentIndex + 1];
      setCurrentIndex((prev) => prev + 1);
      onSetQuizTarget({
        level: nextQ.level,
        id: nextQ.targetId,
        name: nextQ.name,
      });
    } else {
      setIsTimerRunning(false);
      setQuizFinished(true);
      onSetQuizTarget(null);
    }
  };

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200/90 dark:border-stone-800 p-4 transition-all">
      {/* Quiz Level Switcher Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-sm text-stone-900 dark:text-white">
            {country.flag} 地図パズル・暗記クイズ
          </span>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg text-xs">
          <button
            onClick={() => {
              setSelectedLevel(1);
              startNewQuiz(1);
            }}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
              selectedLevel === 1
                ? 'bg-amber-600 text-white font-bold'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            第1階層
          </button>
          <button
            onClick={() => {
              setSelectedLevel(2);
              startNewQuiz(2);
            }}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
              selectedLevel === 2
                ? 'bg-sky-600 text-white font-bold'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            第2階層
          </button>
          <button
            onClick={() => {
              setSelectedLevel(3);
              startNewQuiz(3);
            }}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
              selectedLevel === 3
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            第3階層
          </button>
          <button
            onClick={() => {
              setSelectedLevel('all');
              startNewQuiz('all');
            }}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
              selectedLevel === 'all'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            総合
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer ml-2"
        >
          ✕ 閉じる
        </button>
      </div>

      {!quizFinished && currentQ ? (
        <div>
          {/* Progress and Stats Row */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-3 font-medium">
            <div className="flex items-center gap-3">
              <span>
                問題: <strong className="text-stone-900 dark:text-white">{currentIndex + 1}</strong> / {questions.length}
              </span>
              <span>
                スコア: <strong className="text-amber-600">{score}</strong> 点
              </span>
              {streak >= 2 && (
                <span className="flex items-center gap-1 text-orange-600 font-bold animate-bounce">
                  <Flame className="w-3.5 h-3.5" />
                  {streak}連続正解!
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 font-mono text-stone-600 dark:text-stone-300">
              <Clock className="w-3.5 h-3.5" />
              <span>{timerSeconds}秒</span>
            </div>
          </div>

          {/* Question Prompt Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-stone-800 dark:to-stone-800/60 border border-amber-200/80 dark:border-stone-700 mb-3 text-center">
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-300 mb-1.5">
              {currentQ.level === 1 && `第1階層: ${country.levelNames.level1.ja}`}
              {currentQ.level === 2 && `第2階層: ${country.levelNames.level2.ja}`}
              {currentQ.level === 3 && `第3階層: ${country.levelNames.level3.ja}`}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white tracking-wide">
              『{currentQ.name}』
              <span className="text-sm font-normal text-stone-500 dark:text-stone-400 block sm:inline sm:ml-2">
                ({currentQ.nameEn})
              </span>
            </h3>

            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              {currentQ.parentName ? `(所属: ${currentQ.parentName}) · ` : ''}
              地図上で該当する場所をクリックしてください！
            </p>

            {/* Hint Box */}
            {showHint && (
              <div className="mt-3 p-2.5 rounded-lg bg-white/80 dark:bg-stone-900/80 border border-amber-300 dark:border-amber-700 text-xs text-stone-700 dark:text-stone-300 text-left flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>ヒント: </strong>
                  {currentQ.hintText}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons (Hint / Skip) */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHint(true)}
              disabled={showHint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/30 hover:bg-amber-200/70 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>ヒントを見る</span>
            </button>

            <button
              onClick={handleSkip}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <span>スキップ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Completed Results Screen */
        <div className="text-center py-4 space-y-4">
          <div className="inline-flex p-3 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 mb-1">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
            クイズ終了！お疲れ様でした！
          </h3>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-center">
            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200/80 dark:border-stone-700">
              <div className="text-xs text-stone-500">正解数</div>
              <div className="text-xl font-bold text-stone-900 dark:text-white">
                {score} / {questions.length}
              </div>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200/80 dark:border-stone-700">
              <div className="text-xs text-stone-500">正解率</div>
              <div className="text-xl font-bold text-amber-600">
                {Math.round((score / Math.max(questions.length, 1)) * 100)}%
              </div>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200/80 dark:border-stone-700">
              <div className="text-xs text-stone-500">所要時間</div>
              <div className="text-xl font-bold text-stone-900 dark:text-white">
                {timerSeconds}秒
              </div>
            </div>
          </div>

          {/* Quick Review of answers */}
          <div className="max-h-40 overflow-y-auto text-left text-xs space-y-1.5 p-2 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
            {answerLog.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-stone-900/60"
              >
                <div className="flex items-center gap-2">
                  {log.correct ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    {log.question.name}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    ({log.question.nameEn})
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-mono">
                  第{log.question.level}階層
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startNewQuiz(selectedLevel)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>もう一度挑戦する</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              マップ探索に戻る
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
