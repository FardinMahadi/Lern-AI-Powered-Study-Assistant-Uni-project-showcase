import { Box, Avatar, Typography, Stack } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { AI_MODELS } from "@/lib/constants";
import { SuggestionChip, BRAND_COLORS } from "../ChatStyles";

interface ChatEmptyStateProps {
  selectedModel: string;
  onSuggestionClick: (suggestion: string) => void;
}

export function ChatEmptyState({ selectedModel, onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          mb: 3,
          bgcolor: BRAND_COLORS.accent,
          color: BRAND_COLORS.neutralDark,
        }}
      >
        <SmartToyIcon sx={{ fontSize: 40 }} />
      </Avatar>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight={600}
        sx={{ color: "#F7F9FB", fontFamily: "var(--font-heading)" }}
      >
        Start a conversation
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: 500,
          mb: 4,
          color: "rgba(255, 255, 255, 0.72)",
        }}
      >
        Ask me anything! I&apos;m powered by{" "}
        <Box component="span" sx={{ color: BRAND_COLORS.accent, fontWeight: 600 }}>
          {AI_MODELS.find((m) => m.id === selectedModel)?.name}
        </Box>
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
        <SuggestionChip
          label="Explain quantum computing"
          onClick={() => onSuggestionClick("Explain quantum computing in simple terms")}
        />
        <SuggestionChip
          label="Write Python code"
          onClick={() => onSuggestionClick("Write a Python function to sort a list")}
        />
        <SuggestionChip
          label="Latest AI trends"
          onClick={() => onSuggestionClick("What are the latest AI trends?")}
        />
      </Stack>
    </Box>
  );
}
