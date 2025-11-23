'use client';

import { Message } from '@/types';
import { ChatResponse } from '@/types/api';
import { AI_MODELS } from '@/lib/constants';
import apiClient from '@/lib/api/api-client';
import { useState, useRef, useEffect } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { useDashboardLayout } from '@/components/layout';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ChatEmptyState, ChatMessageList, ChatInputArea, StyledSelect } from '@/features/chat';
import {
  Box,
  Container,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  IconButton,
} from '@mui/material';

const AUTO_HIDE_THRESHOLD = 6;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoHiddenRef = useRef(false);
  const { hideSidebar, showSidebar, sidebarVisible, collapsed, setCollapsed } =
    useDashboardLayout();
  const theme = useTheme();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      showSidebar();
      setCollapsed(false);
    };
  }, [showSidebar, setCollapsed]);

  // Auto-hide sidebar logic
  useEffect(() => {
    if (messages.length >= AUTO_HIDE_THRESHOLD && !hasAutoHiddenRef.current) {
      hideSidebar();
      hasAutoHiddenRef.current = true;
    }

    if (messages.length < AUTO_HIDE_THRESHOLD && hasAutoHiddenRef.current) {
      showSidebar();
      hasAutoHiddenRef.current = false;
    }
  }, [messages.length, hideSidebar, showSidebar]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B for sidebar toggle
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        if (sidebarVisible) {
          hideSidebar();
        } else {
          showSidebar();
        }
      }
      // Escape to clear input
      if (e.key === 'Escape' && input && !isLoading) {
        e.preventDefault();
        setInput('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarVisible, input, isLoading, hideSidebar, showSidebar]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post<ChatResponse>('/chat', {
        messages: updatedMessages.map(message => ({
          role: message.role,
          content: message.content,
        })),
        model: selectedModel,
      });

      const aiMessage: Message = {
        id: response.id,
        role: 'assistant',
        content: response.content,
        model: response.model,
        timestamp: new Date(response.timestamp),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error('Failed to fetch AI response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Sorry, I couldn't reach the AI service right now. Please try again.",
        model: selectedModel,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleAttachmentSelect = (files: FileList) => {
    if (!files || files.length === 0) return;
    const attachmentSummary = Array.from(files)
      .map(file => file.name)
      .join(', ');
    setInput(prev => {
      const prefix = prev ? `${prev.trimEnd()}\n` : '';
      return `${prefix}[Attachment: ${attachmentSummary}] `;
    });
  };

  const handleClearInput = () => {
    setInput('');
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement | null;
      const form = target?.form ?? (e.currentTarget as HTMLDivElement).closest('form');
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
        position: 'relative',
        color: theme.palette.text.primary,
        fontSize: theme.typography.body2.fontSize,
      }}
    >
      {/* Messages Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          pb: { xs: '180px', sm: '200px', md: '220px' },
          pt: { xs: 8, md: 9 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 3,
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 2, md: 3 },
              mb: { xs: 2.5, md: 3.5 },
            }}
          >
            <Stack spacing={0.75} sx={{ minWidth: { xs: '100%', sm: 280 } }}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: '0.12em',
                  color: alpha(theme.palette.text.secondary, 0.85),
                }}
              >
                Active Model
              </Typography>
              <FormControl size="small" fullWidth>
                <InputLabel
                  id="active-model-select-label"
                  sx={{ color: alpha(theme.palette.text.secondary, 0.8) }}
                >
                  AI Model
                </InputLabel>
                <StyledSelect
                  labelId="active-model-select-label"
                  id="active-model-select"
                  value={selectedModel}
                  label="AI Model"
                  onChange={e => setSelectedModel(e.target.value as string)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                        '& .MuiMenuItem-root': {
                          color: theme.palette.text.primary,
                          fontSize: '0.9rem',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.text.primary, 0.06),
                          },
                          '&.Mui-selected': {
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.18),
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  {AI_MODELS.map(model => (
                    <MenuItem key={model.id} value={model.id}>
                      {model.name} • {model.provider}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1.25, sm: 2 }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ width: '100%', justifyContent: { sm: 'flex-end' } }}
            >
              <Typography
                variant="body2"
                sx={{ color: alpha(theme.palette.text.secondary, 0.9), letterSpacing: '0.01em' }}
              >
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Tooltip
                  title={sidebarVisible ? 'Hide sidebar (Ctrl+B)' : 'Show sidebar (Ctrl+B)'}
                  arrow
                >
                  <IconButton
                    size="medium"
                    color="inherit"
                    onClick={() => (sidebarVisible ? hideSidebar() : showSidebar())}
                    sx={{
                      bgcolor: alpha(theme.palette.text.primary, 0.08),
                      color: theme.palette.text.primary,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.text.primary, 0.16),
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    {sidebarVisible ? (
                      <MenuOpenRoundedIcon fontSize="small" />
                    ) : (
                      <MenuRoundedIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} arrow>
                  <span>
                    <IconButton
                      size="medium"
                      color="inherit"
                      onClick={() => setCollapsed(!collapsed)}
                      disabled={!sidebarVisible}
                      sx={{
                        bgcolor: alpha(theme.palette.text.primary, 0.08),
                        color: theme.palette.text.primary,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.text.primary, 0.16),
                          transform: 'scale(1.05)',
                        },
                        '&.Mui-disabled': {
                          bgcolor: alpha(theme.palette.text.primary, 0.06),
                          color: alpha(theme.palette.text.primary, 0.3),
                        },
                      }}
                    >
                      {collapsed ? (
                        <ChevronRightRoundedIcon fontSize="small" />
                      ) : (
                        <ChevronLeftRoundedIcon fontSize="small" />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>

          {messages.length === 0 ? (
            <ChatEmptyState
              selectedModel={selectedModel}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : (
            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
          )}
        </Container>
      </Box>

      {/* Input Area */}
      <ChatInputArea
        input={input}
        isLoading={isLoading}
        messageCount={messages.length}
        onInputChange={setInput}
        onAttachmentSelect={handleAttachmentSelect}
        onClearInput={handleClearInput}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}
