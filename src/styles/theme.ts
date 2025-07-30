import colors from './colors';
import typography from './typograpy';

const theme = {
  colors,
  typography,
} as const;

export type Theme = typeof theme;

export default theme;
