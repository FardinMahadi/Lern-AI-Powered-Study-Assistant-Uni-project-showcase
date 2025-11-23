'use client';

import { Message } from '@/types';
import { ChatResponse } from '@/types/api';
import { AI_MODELS } from '@/lib/constants';
import apiClient from '@/lib/api/api-client';
import { alpha, useTheme } from '@mui/material/styles';
import { useDashboardLayout } from '@/components/layout';
import { useState, useRef, useEffect, useCallback } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ChatEmptyState, ChatMessageList, ChatInputArea, StyledSelect } from '@/features/chat';
import { Box, Stack, Tooltip, MenuItem, Container, IconButton, FormControl } from '@mui/material';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>(AI_MODELS[0]?.id || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toggleCollapse, collapsed, setCollapsed } = useDashboardLayout();
  const theme = useTheme();

  // Auto-scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setCollapsed(false);
    };
  }, [setCollapsed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B for sidebar collapse/expand toggle
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        if (toggleCollapse) {
          toggleCollapse();
        } else {
          setCollapsed(!collapsed);
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
  }, [collapsed, input, isLoading, toggleCollapse, setCollapsed]);

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

      if (!response || !response.content) {
        throw new Error('Invalid response from server');
      }

      const aiMessage: Message = {
        id: response.id ?? Date.now(),
        role: 'assistant',
        content: response.content,
        model: response.model ?? selectedModel,
        timestamp: response.timestamp ? new Date(response.timestamp) : new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error('Failed to fetch AI response:', error);

      let errorMessage = "Sorry, I couldn't reach the AI service right now. Please try again.";
      let userFriendlyMessage = errorMessage;

      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();

        if (errorText.includes('rate limit') || errorText.includes('429')) {
          userFriendlyMessage = 'The service is busy. Please wait a moment and try again.';
        } else if (errorText.includes('401') || errorText.includes('unauthorized')) {
          userFriendlyMessage = 'Authentication error. Please check your API configuration.';
        } else if (errorText.includes('timeout') || errorText.includes('timed out')) {
          userFriendlyMessage = 'Request timed out. The model may be processing. Please try again.';
        } else if (errorText.includes('network') || errorText.includes('fetch')) {
          userFriendlyMessage = 'Network error. Please check your connection and try again.';
        } else if (errorText.includes('model')) {
          userFriendlyMessage = 'Model unavailable. Please try a different model.';
        } else {
          userFriendlyMessage = error.message || errorMessage;
        }

        errorMessage = error.message;
      }

      const errorMessageObj: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `⚠️ ${userFriendlyMessage}`,
        model: selectedModel,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessageObj]);
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
        component="main"
        role="main"
        aria-label="Chat messages container"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          pb: { xs: '120px', sm: '130px', md: '140px' },
          pt: { xs: 4, md: 5 },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: 1.5,
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 1, md: 1.5 },
              mb: { xs: 1.5, md: 2 },
            }}
          >
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
              <StyledSelect
                id="active-model-select"
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value as string)}
                aria-label="Select AI model"
                displayEmpty
                sx={{
                  fontSize: '0.85rem',
                  height: 36,
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                      '& .MuiMenuItem-root': {
                        color: theme.palette.text.primary,
                        fontSize: '0.85rem',
                        py: 0.75,
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
                    {model.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
            >
              <Tooltip
                title={collapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
                arrow
              >
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => {
                    if (toggleCollapse) {
                      toggleCollapse();
                    } else {
                      setCollapsed(!collapsed);
                    }
                  }}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  aria-keyshortcuts="Ctrl+B"
                  sx={{
                    bgcolor: alpha(theme.palette.text.primary, 0.06),
                    color: alpha(theme.palette.text.primary, 0.7),
                    width: 32,
                    height: 32,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.text.primary, 0.12),
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  {collapsed ? (
                    <ChevronRightRoundedIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <ChevronLeftRoundedIcon sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              </Tooltip>
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
