GSS_CONFIG = {
  worker: "bower_components/gss/dist/worker.js",
  useWorker: !!window.Worker,

  // Cassowary defaults
  defaultStrength: 'weak', // 'weak', 'medium', 'strong', 'required'
  defaultWeight: 0,

  // FOUC prevention
  // adds "gss-ready" and removes "gss-not-ready" classes on html tag
  readyClass: true,

  // Fractional pixels values
  // bad for text, good for accuracy
  fractionalPixels: true,

  // Scrollbar size offset
  verticalScroll: true,
  horizontalScroll: false,

  // Mutation Observer
  observe: true,
  observerOptions: {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  },

  // Callback to process variables before setting DOM
  processBeforeSet: null, // function

  // ::window resize debounce time
  resizeDebounce: 0, // (ms)

  // Logging
  debug: false,
  warn: false,
  perf: false
}