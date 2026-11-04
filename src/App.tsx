import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import {
  AdminLevel,
  CountryAdministrativeData,
  HierarchyDisplayMode,
  MacroRegion,
  MapMode,
  MapTheme,
  Municipality,
  SubDivision,
} from './types/geo';
import { COUNTRIES, getCountryData } from './data/countries';
import { Header } from './components/Header';
import { HierarchyControls } from './components/HierarchyControls';
import { MapCanvas } from './components/MapCanvas';
import { EducationalDrawer } from './components/EducationalDrawer';
// 初回表示に不要な画面は、開くときに読み込む
const QuizPanel = lazy(() => import('./components/QuizPanel').then((m) => ({ default: m.QuizPanel })));
const HierarchyComparisonView = lazy(() =>
  import('./components/HierarchyComparisonView').then((m) => ({ default: m.HierarchyComparisonView })),
);
const MetroComparisonView = lazy(() =>
  import('./components/MetroComparisonView').then((m) => ({ default: m.MetroComparisonView })),
);
const SearchModal = lazy(() => import('./components/SearchModal').then((m) => ({ default: m.SearchModal })));
const AboutModal = lazy(() => import('./components/AboutModal').then((m) => ({ default: m.AboutModal })));

export default function App() {
  const [countryId, setCountryId] = useState<string>('japan');
  const [mode, setMode] = useState<MapMode>('explore');
  const [displayMode, setDisplayMode] = useState<HierarchyDisplayMode>(2);
  const [theme, setTheme] = useState<MapTheme>('educational');
  const [isBlindMode, setIsBlindMode] = useState<boolean>(false);
  const [isBilingual, setIsBilingual] = useState<boolean>(false);

  // Selected item for Educational Inspection Drawer
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'macro' | 'subdivision' | 'municipality';
    item: MacroRegion | SubDivision | Municipality;
  } | null>(null);

  // Quiz state
  const [quizTarget, setQuizTarget] = useState<{
    level: AdminLevel;
    id: string;
    name: string;
  } | null>(null);

  const [incomingAnswer, setIncomingAnswer] = useState<{
    clickedId: string;
    level: AdminLevel;
  } | null>(null);

  const [lastAnswerFeedback, setLastAnswerFeedback] = useState<{
    correct: boolean;
    id: string;
  } | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  // 都市圏比較：開いたときに先頭で選択する都市圏（詳細パネルから開く場合）
  const [metroView, setMetroView] = useState<{ fuaId?: number } | null>(null);

  const currentCountry: CountryAdministrativeData = getCountryData(countryId);

  // Reset selected entity when country changes
  useEffect(() => {
    setSelectedEntity(null);
  }, [countryId]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) &&
        !isSearchOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsComparisonOpen(false);
        setIsAboutOpen(false);
        setMetroView(null);
        setSelectedEntity(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Handle map click during quiz
  const handleQuizAnswer = useCallback((clickedId: string, level: AdminLevel) => {
    setIncomingAnswer({ clickedId, level });
  }, []);

  // Handle selection from search modal
  const handleSelectSearchResult = (result: {
    countryId: string;
    type: 'macro' | 'subdivision' | 'municipality';
    id: string;
  }) => {
    if (result.countryId !== countryId) {
      setCountryId(result.countryId);
    }
    const country = getCountryData(result.countryId);

    if (result.type === 'macro') {
      const item = country.macroRegions.find((m) => m.id === result.id);
      if (item) {
        setSelectedEntity({ type: 'macro', item });
        setDisplayMode(1);
      }
    } else if (result.type === 'subdivision') {
      const item = country.subDivisions.find((s) => s.id === result.id);
      if (item) {
        setSelectedEntity({ type: 'subdivision', item });
        setDisplayMode(2);
      }
    } else if (result.type === 'municipality') {
      for (const sub of country.subDivisions) {
        const m = sub.municipalities.find((mun) => mun.id === result.id);
        if (m) {
          setSelectedEntity({ type: 'municipality', item: m });
          setDisplayMode(3);
          break;
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans">
      {/* Top Header */}
      <Header
        country={currentCountry}
        onSelectCountry={(id) => {
          setCountryId(id);
          setSelectedEntity(null);
        }}
        mode={mode}
        onChangeMode={(newMode) => {
          setMode(newMode);
          if (newMode === 'quiz') {
            setSelectedEntity(null);
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenMetro={() => setMetroView({})}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Hierarchy & View Controls Bar */}
      <HierarchyControls
        country={currentCountry}
        displayMode={displayMode}
        onChangeDisplayMode={setDisplayMode}
        isBlindMode={isBlindMode}
        onToggleBlindMode={() => setIsBlindMode((prev) => !prev)}
        isBilingual={isBilingual}
        onToggleBilingual={() => setIsBilingual((prev) => !prev)}
        theme={theme}
        onChangeTheme={setTheme}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Map Viewport Area */}
        <main className="flex-1 relative h-full">
          <MapCanvas
            country={currentCountry}
            mode={mode}
            displayMode={displayMode}
            theme={theme}
            isBlindMode={isBlindMode}
            isBilingual={isBilingual}
            selectedEntity={selectedEntity}
            onSelectEntity={(ent) => setSelectedEntity(ent)}
            quizTarget={quizTarget}
            onQuizAnswer={handleQuizAnswer}
            lastAnswerFeedback={lastAnswerFeedback}
          />

          {/* Gamified Quiz Panel Overlay when Quiz Mode is active */}
          {mode === 'quiz' && (
            <Suspense fallback={null}>
            <QuizPanel
              country={currentCountry}
              onClose={() => setMode('explore')}
              onSetQuizTarget={setQuizTarget}
              incomingAnswer={incomingAnswer}
              onFeedback={setLastAnswerFeedback}
            />
            </Suspense>
          )}
        </main>

        {/* Slide-out Educational Inspector Drawer */}
        {selectedEntity && mode === 'explore' && (
          <EducationalDrawer
            country={currentCountry}
            selectedEntity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
            onSelectSubdivision={(sub) => {
              setSelectedEntity({ type: 'subdivision', item: sub });
              setDisplayMode(2);
            }}
            onSelectMunicipality={(m) => {
              setSelectedEntity({ type: 'municipality', item: m });
              setDisplayMode(3);
            }}
            onOpenMetro={(fuaId) => setMetroView({ fuaId })}
            onStartQuizForEntity={() => {
              setMode('quiz');
              setSelectedEntity(null);
            }}
          />
        )}
      </div>

      {/* Modals */}
      <Suspense fallback={null}>
      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectResult={handleSelectSearchResult}
        />
      )}

      {isComparisonOpen && (
        <HierarchyComparisonView
          onClose={() => setIsComparisonOpen(false)}
          onSelectCountry={(id) => {
            setCountryId(id);
            setSelectedEntity(null);
          }}
        />
      )}

      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      {metroView && <MetroComparisonView onClose={() => setMetroView(null)} initialFuaId={metroView.fuaId} />}
      </Suspense>
    </div>
  );
}
