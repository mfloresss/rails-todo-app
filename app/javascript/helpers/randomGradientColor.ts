const BACKGROUND_COLORS = [
  ["#185a9d", "#43cea2"],
  ["#267871", "#136a8a"],
  ["#0072ff", "#00c6ff"],
  ["#f83600", "#fe8c00"],
  ["#3a7bd5", "#00d2ff"],
  ["#ff9472", "#f2709c"],
  ["#96DEDA", "#50C9C3"],
  ["#f857a6", "#ff5858"],
  ["#4b6cb7", "#182848"],
  ["#fc354c", "#0abfbc"],
];

export const randomGradientColor = () =>
  BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)];
