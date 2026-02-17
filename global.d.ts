// global.d.ts
interface Window {
  addRandomEvent: VoidFunction;
  addRandomRangeEvent: VoidFunction;
  addTimeline: VoidFunction;
  removeTimeline: VoidFunction;
  resetView: VoidFunction;
  exportData: VoidFunction;
  importData: VoidFunction;
  toggleStageLines: VoidFunction;
  changeLocale: (newLocale: Locale) => void;
}
