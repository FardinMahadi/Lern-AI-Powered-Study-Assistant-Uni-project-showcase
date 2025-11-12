import {
  Paper,
  Container,
  Stack,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AI_MODELS } from "@/lib/constants";
import { StyledTextField, StyledSelect, BRAND_COLORS } from "../ChatStyles";

interface ChatInputAreaProps {
  input: string;
  selectedModel: string;
  isLoading: boolean;
  messageCount: number;
  onInputChange: (value: string) => void;
  onModelChange: (model: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function ChatInputArea({
  input,
  selectedModel,
  isLoading,
  messageCount,
  onInputChange,
  onModelChange,
  onSubmit,
  onKeyDown,
}: ChatInputAreaProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
        bgcolor: BRAND_COLORS.neutralDarker,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                alignItems: { xs: "stretch", sm: "flex-end" },
              }}
            >
              <StyledTextField
                fullWidth
                multiline
                maxRows={4}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your message... (Shift + Enter for new line)"
                disabled={isLoading}
              />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
                sx={{ minWidth: { sm: 320 } }}
              >
                <FormControl size="small" fullWidth>
                  <InputLabel id="model-select-label" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    AI Model
                  </InputLabel>
                  <StyledSelect
                    labelId="model-select-label"
                    id="model-select"
                    value={selectedModel}
                    label="AI Model"
                    onChange={(e) => onModelChange(e.target.value)}
                    disabled={isLoading}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: BRAND_COLORS.surfaceMedium,
                          border: `1px solid rgba(255, 255, 255, 0.08)`,
                          "& .MuiMenuItem-root": {
                            color: "#F7F9FB",
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.05)",
                            },
                            "&.Mui-selected": {
                              bgcolor: "rgba(0, 217, 255, 0.1)",
                              "&:hover": {
                                bgcolor: "rgba(0, 217, 255, 0.15)",
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    {AI_MODELS.map((model) => (
                      <MenuItem key={model.id} value={model.id}>
                        {model.name} • {model.provider}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>

                <IconButton
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  sx={{
                    bgcolor: BRAND_COLORS.accent,
                    color: BRAND_COLORS.neutralDark,
                    px: 2,
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      bgcolor: BRAND_COLORS.accentLight,
                    },
                    "&.Mui-disabled": {
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      color: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Stack>
            </Box>

            <Typography
              variant="caption"
              sx={{ color: "rgba(255, 255, 255, 0.4)", textAlign: { xs: "left", sm: "right" } }}
            >
              {messageCount} message{messageCount !== 1 ? "s" : ""}
            </Typography>
          </Stack>
        </form>
      </Container>
    </Paper>
  );
}
