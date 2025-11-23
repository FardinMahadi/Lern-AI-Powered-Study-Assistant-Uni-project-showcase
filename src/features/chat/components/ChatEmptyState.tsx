import { AI_MODELS } from "@/lib/constants";
import CodeIcon from "@mui/icons-material/Code";
import { useTheme, alpha } from "@mui/material/styles";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Avatar, Typography, Stack } from "@mui/material";

import { SuggestionChip } from "../styles";
import { ChatEmptyStateProps } from "../types";

const suggestions = [
  {
    label: "Explain quantum computing",
    prompt: "Explain quantum computing in simple terms",
    icon: LightbulbIcon,
  },
  {
    label: "Write Python code",
    prompt: "Write a Python function to sort a list",
    icon: CodeIcon,
  },
  {
    label: "Latest AI trends",
    prompt: "What are the latest AI trends?",
    icon: TrendingUpIcon,
  },
];

export function ChatEmptyState({ selectedModel, onSuggestionClick }: ChatEmptyStateProps) {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const modelName = AI_MODELS.find((m) => m.id === selectedModel)?.name || "AI";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "55vh",
        textAlign: "center",
        gap: 2,
        px: 2,
      }}
    >
      <Avatar
        sx={{
          width: { xs: 72, sm: 84 },
          height: { xs: 72, sm: 84 },
          mb: 2,
          bgcolor: accent,
          color: theme.palette.getContrastText(accent),
          boxShadow: `0 8px 32px ${alpha(accent, 0.35)}`,
          animation: "pulse 3s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": {
              transform: "scale(1)",
              boxShadow: `0 8px 32px ${alpha(accent, 0.35)}`,
            },
            "50%": {
              transform: "scale(1.05)",
              boxShadow: `0 12px 48px ${alpha(accent, 0.45)}`,
            },
          },
        }}
      >
        <SmartToyIcon sx={{ fontSize: { xs: 36, sm: 42 } }} />
      </Avatar>

      <Stack spacing={1.5} alignItems="center">
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: theme.palette.text.primary,
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.75rem", sm: "2.125rem" },
          }}
        >
          Start a conversation
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 560,
            mb: 1,
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Ask me anything! I&apos;m powered by{" "}
          <Box
            component="span"
            sx={{
              color: accent,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.7)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {modelName}
          </Box>
        </Typography>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          color: alpha(theme.palette.text.secondary, 0.7),
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        Try these suggestions
      </Typography>

      <Stack
        direction="row"
        spacing={1.25}
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          maxWidth: 700,
          "& > *": {
            m: 0.5,
          },
        }}
      >
        {suggestions.map((suggestion) => (
          <SuggestionChip
            key={suggestion.label}
            icon={<suggestion.icon sx={{ fontSize: 18 }} />}
            label={suggestion.label}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            sx={{
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 4px 12px ${alpha(accent, 0.2)}`,
              },
            }}
          />
        ))}
      </Stack>

      <Typography
        variant="caption"
        sx={{
          mt: 4,
          color: alpha(theme.palette.text.secondary, 0.6),
          fontSize: "0.75rem",
        }}
      >
        Press Ctrl+B to toggle sidebar • Esc to clear input
      </Typography>
    </Box>
  );
}
