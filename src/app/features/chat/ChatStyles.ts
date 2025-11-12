import { Box, TextField, Select, Chip, styled } from "@mui/material";

export const BRAND_COLORS = {
  accent: "#00D9FF",
  accentDark: "#0096B5",
  accentLight: "#7EEBFF",
  neutralDark: "#0A0A0A",
  neutralDarker: "#040404",
  surfaceDark: "#1A1A1A",
  surfaceMedium: "#22272E",
};

export const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser?: boolean }>(({ isUser }) => ({
  maxWidth: "75%",
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: isUser ? BRAND_COLORS.accent : BRAND_COLORS.surfaceDark,
  color: isUser ? BRAND_COLORS.neutralDark : "#F7F9FB",
  border: !isUser ? `1px solid rgba(255, 255, 255, 0.08)` : "none",
  boxShadow: isUser ? "0 4px 12px rgba(0, 217, 255, 0.3)" : "none",
}));

export const SuggestionChip = styled(Chip)({
  borderRadius: "24px",
  padding: "8px 16px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: `1px solid rgba(255, 255, 255, 0.1)`,
  color: "#F7F9FB",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: BRAND_COLORS.accent,
  },
});

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: BRAND_COLORS.surfaceDark,
    border: `1px solid rgba(255, 255, 255, 0.08)`,
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      backgroundColor: BRAND_COLORS.surfaceMedium,
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    "&.Mui-focused": {
      borderColor: BRAND_COLORS.accent,
      boxShadow: `0 0 0 2px rgba(0, 217, 255, 0.1)`,
    },
  },
  "& .MuiInputBase-input": {
    color: "#F7F9FB",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.4)",
      opacity: 1,
    },
  },
});

export const StyledSelect = styled(Select)({
  borderRadius: "12px",
  backgroundColor: BRAND_COLORS.surfaceDark,
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  color: "#F7F9FB",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: BRAND_COLORS.surfaceMedium,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  "&.Mui-focused": {
    borderColor: BRAND_COLORS.accent,
  },
});
