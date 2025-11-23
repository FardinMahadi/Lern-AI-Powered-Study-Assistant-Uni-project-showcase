import SendIcon from "@mui/icons-material/Send";
import { alpha, useTheme } from "@mui/material/styles";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Paper, Stack, Box, IconButton, Typography, Tooltip } from "@mui/material";

import { StyledTextField } from "../styles";
import { ChatInputAreaProps } from "../types";

const MAX_CHARS = 2000;

export function ChatInputArea({
  input,
  isLoading,
  messageCount,
  onInputChange,
  onAttachmentSelect,
  onClearInput,
  onSubmit,
  onKeyDown,
}: ChatInputAreaProps) {
  const theme = useTheme();
  const charCount = input.length;
  const isNearLimit = charCount > MAX_CHARS * 0.8;
  const isOverLimit = charCount > MAX_CHARS;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      onAttachmentSelect?.(files);
    }
    event.target.value = "";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        bottom: 0,
        left: { xs: 0, md: "240px" }, // Account for sidebar
        right: 0,
        width: "auto",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 0.6)}`,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? alpha(theme.palette.background.default, 0.92)
            : alpha(theme.palette.background.paper, 0.96),
        backdropFilter: "blur(12px)",
        boxSizing: "border-box",
        pb: { xs: "env(safe-area-inset-bottom, 8px)", sm: 1 },
        pt: 1,
        display: "flex",
        justifyContent: "center",
        px: { xs: 1.5, sm: 2.5 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: (theme) => theme.breakpoints.values.lg,
          py: 1.25,
        }}
      >
        <form onSubmit={onSubmit}>
          <Stack spacing={1.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1.5, sm: 2 },
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
                placeholder="Type your message... (Shift + Enter for new line, Esc to clear)"
                disabled={isLoading}
                aria-label="Message input"
                aria-describedby="char-count-hint"
                error={isOverLimit}
              />

              <Stack
                direction="row"
                spacing={1.25}
                alignItems="center"
                justifyContent="flex-end"
                sx={{
                  alignSelf: { xs: "stretch", sm: "flex-end" },
                  "& .MuiIconButton-root": {
                    width: { xs: 38, sm: 42 },
                    height: { xs: 38, sm: 42 },
                  },
                }}
              >
                <Tooltip title="Attach files" arrow>
                  <IconButton
                    component="label"
                    size="medium"
                    disabled={isLoading}
                    aria-label="Attach files"
                    sx={{
                      bgcolor: alpha(theme.palette.text.primary, 0.08),
                      color: theme.palette.text.primary,
                      borderRadius: 2,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.text.primary, 0.16),
                        transform: "scale(1.05)",
                      },
                      "&.Mui-disabled": {
                        bgcolor: alpha(theme.palette.text.primary, 0.06),
                        color: alpha(theme.palette.text.primary, 0.3),
                      },
                    }}
                  >
                    <AttachFileRoundedIcon fontSize="small" />
                    <input type="file" hidden multiple onChange={handleFileChange} />
                  </IconButton>
                </Tooltip>

                {input.trim().length > 0 && (
                  <Tooltip title="Clear message (Esc)" arrow>
                    <IconButton
                      size="medium"
                      disabled={isLoading}
                      onClick={onClearInput}
                      aria-label="Clear message"
                      sx={{
                        bgcolor: alpha(theme.palette.text.primary, 0.08),
                        color: theme.palette.text.primary,
                        borderRadius: 2,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.text.primary, 0.16),
                          transform: "scale(1.05)",
                        },
                        "&.Mui-disabled": {
                          bgcolor: alpha(theme.palette.text.primary, 0.06),
                          color: alpha(theme.palette.text.primary, 0.3),
                        },
                      }}
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                <Tooltip title={!input.trim() ? "Type a message to send" : "Send message"} arrow>
                  <span>
                    <IconButton
                      type="submit"
                      disabled={!input.trim() || isLoading || isOverLimit}
                      aria-label="Send message"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.getContrastText(theme.palette.primary.main),
                        px: 1.75,
                        py: 1.5,
                        borderRadius: 2.5,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          bgcolor: theme.palette.primary.light,
                          transform: "scale(1.05)",
                        },
                        "&.Mui-disabled": {
                          bgcolor: alpha(theme.palette.primary.main, 0.16),
                          color: alpha(
                            theme.palette.getContrastText(theme.palette.primary.main),
                            0.45
                          ),
                        },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.85),
                  letterSpacing: "0.02em",
                }}
              >
                {messageCount} message{messageCount !== 1 ? "s" : ""}
              </Typography>

              {charCount > 0 && (
                <Typography
                  id="char-count-hint"
                  variant="caption"
                  sx={{
                    color: isOverLimit
                      ? theme.palette.error.main
                      : isNearLimit
                        ? theme.palette.warning.main
                        : alpha(theme.palette.text.secondary, 0.7),
                    fontWeight: isNearLimit ? 600 : 400,
                    transition: "color 0.2s ease-in-out",
                  }}
                >
                  {charCount}/{MAX_CHARS}
                </Typography>
              )}
            </Box>
          </Stack>
        </form>
      </Box>
    </Paper>
  );
}
