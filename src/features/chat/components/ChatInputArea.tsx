import SendIcon from '@mui/icons-material/Send';
import { alpha, useTheme } from '@mui/material/styles';
import { useDashboardLayout } from '@/components/layout';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Paper, Stack, Box, IconButton, Typography, Tooltip } from '@mui/material';

import { StyledTextField } from '../styles';
import { ChatInputAreaProps } from '../types';

const MAX_CHARS = 2000;
const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 88;

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
  const { sidebarVisible, collapsed } = useDashboardLayout();
  const charCount = input.length;
  const isNearLimit = charCount > MAX_CHARS * 0.8;
  const isOverLimit = charCount > MAX_CHARS;

  // Calculate sidebar width dynamically
  const sidebarWidth = sidebarVisible ? (collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH) : 0;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      onAttachmentSelect?.(files);
    }
    event.target.value = '';
  };

  return (
    <Paper
      component="footer"
      elevation={0}
      role="region"
      aria-label="Chat input area"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: { xs: 0, md: `${sidebarWidth}px` },
        right: 0,
        width: { xs: '100%', md: `calc(100% - ${sidebarWidth}px)` },
        zIndex: theme => theme.zIndex.drawer + 1,
        borderTop: theme => `1px solid ${alpha(theme.palette.divider, 0.6)}`,
        bgcolor: theme =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.default, 0.92)
            : alpha(theme.palette.background.paper, 0.96),
        backdropFilter: 'blur(12px)',
        boxSizing: 'border-box',
        pb: { xs: 'env(safe-area-inset-bottom, 6px)', sm: 0.75 },
        pt: 0.75,
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 1, sm: 1.5 },
        transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: theme => theme.breakpoints.values.md,
          py: 0.75,
        }}
      >
        <form onSubmit={onSubmit}>
          <Stack spacing={1}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                alignItems: { xs: 'stretch', sm: 'flex-end' },
              }}
            >
              <StyledTextField
                fullWidth
                multiline
                maxRows={3}
                value={input}
                onChange={e => onInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                aria-label="Message input"
                aria-describedby="char-count-hint message-count-hint"
                aria-invalid={isOverLimit}
                error={isOverLimit}
                autoFocus={false}
              />

              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                justifyContent="flex-end"
                sx={{
                  alignSelf: { xs: 'stretch', sm: 'flex-end' },
                  '& .MuiIconButton-root': {
                    width: { xs: 32, sm: 36 },
                    height: { xs: 32, sm: 36 },
                  },
                }}
              >
                <Tooltip title="Attach files" arrow>
                  <IconButton
                    component="label"
                    size="medium"
                    disabled={isLoading}
                    aria-label="Attach files"
                    role="button"
                    tabIndex={0}
                    sx={{
                      bgcolor: alpha(theme.palette.text.primary, 0.06),
                      color: alpha(theme.palette.text.primary, 0.7),
                      borderRadius: 1.5,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.text.primary, 0.12),
                        color: theme.palette.text.primary,
                      },
                      '&.Mui-disabled': {
                        bgcolor: alpha(theme.palette.text.primary, 0.04),
                        color: alpha(theme.palette.text.primary, 0.25),
                      },
                    }}
                  >
                    <AttachFileRoundedIcon sx={{ fontSize: 18 }} />
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
                        bgcolor: alpha(theme.palette.text.primary, 0.06),
                        color: alpha(theme.palette.text.primary, 0.7),
                        borderRadius: 1.5,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.text.primary, 0.12),
                          color: theme.palette.text.primary,
                        },
                        '&.Mui-disabled': {
                          bgcolor: alpha(theme.palette.text.primary, 0.04),
                          color: alpha(theme.palette.text.primary, 0.25),
                        },
                      }}
                    >
                      <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}

                <Tooltip title={!input.trim() ? 'Type a message to send' : 'Send message'} arrow>
                  <span>
                    <IconButton
                      type="submit"
                      disabled={!input.trim() || isLoading || isOverLimit}
                      aria-label="Send message"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.getContrastText(theme.palette.primary.main),
                        px: 1.5,
                        py: 1,
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          bgcolor: theme.palette.primary.light,
                        },
                        '&.Mui-disabled': {
                          bgcolor: alpha(theme.palette.primary.main, 0.16),
                          color: alpha(
                            theme.palette.getContrastText(theme.palette.primary.main),
                            0.45
                          ),
                        },
                      }}
                    >
                      <SendIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 0.5,
              }}
            >
              <Typography
                id="message-count-hint"
                variant="caption"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.6),
                  letterSpacing: '0.01em',
                  fontSize: '0.65rem',
                }}
                aria-live="polite"
              >
                {messageCount} message{messageCount !== 1 ? 's' : ''}
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
                        : alpha(theme.palette.text.secondary, 0.6),
                    fontWeight: isNearLimit ? 500 : 400,
                    fontSize: '0.65rem',
                    transition: 'color 0.2s ease-in-out',
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
