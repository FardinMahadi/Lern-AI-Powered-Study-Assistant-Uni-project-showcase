import { TypographyOptions } from "@mui/material/styles";

const headingFontFamily =
  '"Sora", "Lexend", "Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';
const bodyFontFamily =
  '"Lexend", "Sora", "Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';

export const typography: TypographyOptions = {
  fontFamily: bodyFontFamily,
  h1: {
    fontFamily: headingFontFamily,
    fontWeight: 600,
    fontSize: "clamp(2.5rem, 4vw + 1rem, 3.25rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.045em",
  },
  h2: {
    fontFamily: headingFontFamily,
    fontWeight: 600,
    fontSize: "clamp(2.1rem, 2.5vw + 1rem, 2.75rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.035em",
  },
  h3: {
    fontFamily: headingFontFamily,
    fontWeight: 600,
    fontSize: "clamp(1.75rem, 1.5vw + 1rem, 2.2rem)",
    lineHeight: 1.18,
    letterSpacing: "-0.02em",
  },
  h4: {
    fontFamily: headingFontFamily,
    fontWeight: 600,
    fontSize: "clamp(1.45rem, 1.2vw + 0.9rem, 1.85rem)",
    lineHeight: 1.22,
    letterSpacing: "-0.015em",
  },
  h5: {
    fontFamily: headingFontFamily,
    fontWeight: 500,
    fontSize: "clamp(1.25rem, 0.6vw + 0.95rem, 1.55rem)",
    lineHeight: 1.28,
  },
  h6: {
    fontFamily: headingFontFamily,
    fontWeight: 500,
    fontSize: "clamp(1.05rem, 0.4vw + 0.9rem, 1.3rem)",
    lineHeight: 1.32,
  },
  subtitle1: {
    fontFamily: bodyFontFamily,
    fontWeight: 500,
    fontSize: "clamp(0.95rem, 0.25vw + 0.85rem, 1.05rem)",
    lineHeight: 1.55,
  },
  subtitle2: {
    fontFamily: bodyFontFamily,
    fontWeight: 500,
    fontSize: "clamp(0.85rem, 0.2vw + 0.8rem, 0.95rem)",
    lineHeight: 1.5,
    letterSpacing: "0.01em",
  },
  body1: {
    fontFamily: bodyFontFamily,
    fontSize: "clamp(0.95rem, 0.2vw + 0.85rem, 1rem)",
    lineHeight: 1.62,
  },
  body2: {
    fontFamily: bodyFontFamily,
    fontSize: "clamp(0.88rem, 0.18vw + 0.8rem, 0.95rem)",
    lineHeight: 1.55,
  },
  button: {
    fontFamily: bodyFontFamily,
    fontWeight: 600,
    fontSize: "0.95rem",
    textTransform: "none",
    letterSpacing: "0.01em",
  },
  caption: {
    fontFamily: bodyFontFamily,
    fontSize: "0.75rem",
    lineHeight: 1.45,
    letterSpacing: "0.02em",
  },
  overline: {
    fontFamily: headingFontFamily,
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
};
