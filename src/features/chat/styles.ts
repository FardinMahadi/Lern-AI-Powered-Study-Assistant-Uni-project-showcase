import { alpha, styled } from "@mui/material/styles";
import { Box, TextField, Select, Chip } from "@mui/material";

export const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser?: boolean }>(({ theme, isUser }) => {
  const primary = theme.palette.primary.main;
  const surface = theme.palette.background.paper;
  const textOnPrimary = theme.palette.getContrastText(primary);

  return {
    width: "fit-content",
    maxWidth: "min(72%, 680px)",
    minWidth: "120px",
    padding: "16px 18px",
    borderRadius: "16px",
    backgroundColor: isUser ? primary : alpha(surface, 0.8),
    color: isUser ? textOnPrimary : theme.palette.text.primary,
    border: isUser ? "none" : `1px solid ${alpha(theme.palette.divider, 0.7)}`,
    boxShadow: isUser
      ? `0 4px 16px ${alpha(primary, 0.3)}`
      : `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
    display: "flex",
    flexDirection: "column",
    gap: "0.65rem",
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body2.lineHeight ?? 1.6,
    transition: "all 0.2s ease-in-out",
    backdropFilter: isUser ? "none" : "blur(8px)",

    // Responsive sizing
    [theme.breakpoints.down("lg")]: {
      maxWidth: "75%",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "82%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
      padding: "14px 16px",
      borderRadius: "14px",
    },
  };
});

export const SuggestionChip = styled(Chip)(({ theme }) => ({
  borderRadius: "24px",
  padding: "8px 16px",
  height: "auto",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  border: `1.5px solid ${alpha(theme.palette.primary.main, 0.25)}`,
  color: theme.palette.text.primary,
  fontSize: "0.85rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  "& .MuiChip-icon": {
    color: theme.palette.primary.main,
    fontSize: 18,
    marginLeft: "4px",
  },

  "& .MuiChip-label": {
    padding: "0 8px",
  },

  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.18),
    borderColor: alpha(theme.palette.primary.main, 0.35),
    transform: "translateY(-2px)",
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
  },

  "&:active": {
    transform: "translateY(0)",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === "dark" ? 0.95 : 1
    ),
    border: `1.5px solid ${alpha(theme.palette.divider, 0.5)}`,
    transition: "all 0.2s ease-in-out",

    "& fieldset": {
      border: "none",
    },

    "&:hover": {
      backgroundColor: alpha(theme.palette.background.paper, 1),
      borderColor: alpha(theme.palette.primary.main, 0.4),
      boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
    },

    "&.Mui-focused": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
    },

    "&.Mui-error": {
      borderColor: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.main, 0.05),

      "&.Mui-focused": {
        boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.15)}`,
      },
    },
  },

  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 1.6,
    padding: "14px 16px",

    "&::placeholder": {
      color: alpha(theme.palette.text.secondary, 0.65),
      opacity: 1,
    },
  },

  "& .MuiInputBase-inputMultiline": {
    padding: 0,
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.95 : 1),
  border: `1.5px solid ${alpha(theme.palette.divider, 0.5)}`,
  color: theme.palette.text.primary,
  transition: "all 0.2s ease-in-out",

  "& .MuiSelect-select": {
    padding: "11px 14px",
    fontSize: "0.9rem",
    fontWeight: 500,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 1),
    borderColor: alpha(theme.palette.primary.main, 0.4),
    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
  },

  "&.Mui-focused": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
  },

  "& .MuiSvgIcon-root": {
    color: theme.palette.text.secondary,
  },
}));
