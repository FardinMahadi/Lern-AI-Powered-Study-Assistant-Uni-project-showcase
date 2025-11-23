import type { SxProps, Theme } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { AI_MODELS } from '@/lib/constants';
import apiClient from '@/lib/api/api-client';
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import ScienceIcon from '@mui/icons-material/Science';
import { useTheme, alpha } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CalculateIcon from '@mui/icons-material/Calculate';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { SuggestionsResponse, Suggestion } from '@/types/api';
import { Box, Avatar, Typography, Stack, CircularProgress } from '@mui/material';

import { SuggestionChip } from '../styles';
import { ChatEmptyStateProps } from '../types';

// Icon mapping for dynamic suggestions
const ICON_COMPONENTS: Record<string, React.ComponentType<{ sx?: SxProps<Theme> }>> = {
  lightbulb: LightbulbIcon,
  code: CodeIcon,
  trending: TrendingUpIcon,
  book: BookIcon,
  question: HelpOutlineIcon,
  calculator: CalculateIcon,
  science: ScienceIcon,
  language: LanguageIcon,
};

// Default fallback suggestions
const DEFAULT_SUGGESTIONS: Array<{ label: string; prompt: string; icon: string }> = [
  {
    label: 'Explain quantum computing',
    prompt: 'Explain quantum computing in simple terms',
    icon: 'lightbulb',
  },
  {
    label: 'Write Python code',
    prompt: 'Write a Python function to sort a list',
    icon: 'code',
  },
  {
    label: 'Latest AI trends',
    prompt: 'What are the latest AI trends?',
    icon: 'trending',
  },
];

export function ChatEmptyState({ selectedModel, onSuggestionClick }: ChatEmptyStateProps) {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const modelName = AI_MODELS.find(m => m.id === selectedModel)?.name || 'AI';
  const [suggestions, setSuggestions] = useState<
    Array<{ label: string; prompt: string; icon: React.ComponentType<{ sx?: SxProps<Theme> }> }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setIsLoading(true);
        console.log('[ChatEmptyState] Fetching suggestions from API...');

        const response = await apiClient.get<SuggestionsResponse>('/suggestions');

        console.log('[ChatEmptyState] API response received:', response);

        // Validate response structure
        if (!response || typeof response !== 'object') {
          console.warn('[ChatEmptyState] Invalid response structure, using defaults');
          throw new Error('Invalid response structure');
        }

        if (!response.suggestions || !Array.isArray(response.suggestions)) {
          console.warn('[ChatEmptyState] Suggestions array missing or invalid, using defaults');
          throw new Error('Suggestions array missing or invalid');
        }

        if (response.suggestions.length === 0) {
          console.warn('[ChatEmptyState] Empty suggestions array, using defaults');
          throw new Error('Empty suggestions array');
        }

        const mappedSuggestions = response.suggestions
          .filter((suggestion: Suggestion) => {
            // Validate each suggestion has required fields
            if (!suggestion.label || !suggestion.prompt) {
              console.warn('[ChatEmptyState] Invalid suggestion found:', suggestion);
              return false;
            }
            return true;
          })
          .map((suggestion: Suggestion) => {
            const IconComponent = ICON_COMPONENTS[suggestion.icon || 'lightbulb'] || LightbulbIcon;
            return {
              label: suggestion.label,
              prompt: suggestion.prompt,
              icon: IconComponent,
            };
          });

        if (mappedSuggestions.length > 0) {
          console.log(
            `[ChatEmptyState] Successfully loaded ${mappedSuggestions.length} suggestions`
          );
          setSuggestions(mappedSuggestions);
        } else {
          console.warn('[ChatEmptyState] No valid suggestions after mapping, using defaults');
          throw new Error('No valid suggestions after mapping');
        }
      } catch (err) {
        console.error('[ChatEmptyState] Failed to fetch suggestions:', err);

        // Log detailed error information
        if (err instanceof Error) {
          console.error('[ChatEmptyState] Error message:', err.message);
          console.error('[ChatEmptyState] Error stack:', err.stack);
        } else {
          console.error('[ChatEmptyState] Unknown error type:', err);
        }

        // Use default suggestions on error
        const defaultMapped = DEFAULT_SUGGESTIONS.map(s => ({
          label: s.label,
          prompt: s.prompt,
          icon: ICON_COMPONENTS[s.icon] || LightbulbIcon,
        }));

        console.log('[ChatEmptyState] Using default suggestions:', defaultMapped.length);
        setSuggestions(defaultMapped);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <Box
      component="section"
      role="region"
      aria-label="Chat empty state"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        textAlign: 'center',
        gap: 1.5,
        px: 2,
      }}
    >
      <Avatar
        sx={{
          width: { xs: 48, sm: 56 },
          height: { xs: 48, sm: 56 },
          mb: 1,
          bgcolor: accent,
          color: theme.palette.getContrastText(accent),
          boxShadow: `0 4px 16px ${alpha(accent, 0.25)}`,
          animation: 'pulse 3s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'scale(1)',
              boxShadow: `0 4px 16px ${alpha(accent, 0.25)}`,
            },
            '50%': {
              transform: 'scale(1.05)',
              boxShadow: `0 6px 24px ${alpha(accent, 0.35)}`,
            },
          },
        }}
      >
        <SmartToyIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
      </Avatar>

      <Stack spacing={1} alignItems="center">
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{
            color: theme.palette.text.primary,
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.01em',
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
          }}
        >
          Start a conversation
        </Typography>

        <Typography
          variant="body2"
          sx={{
            maxWidth: 480,
            color: alpha(theme.palette.text.secondary, 0.9),
            lineHeight: 1.45,
            fontSize: '0.8rem',
          }}
        >
          Ask me anything! I&apos;m powered by{' '}
          <Box
            component="span"
            sx={{
              color: accent,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.7)} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {modelName}
          </Box>
        </Typography>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          color: alpha(theme.palette.text.secondary, 0.6),
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 500,
          mb: 0.75,
          fontSize: '0.65rem',
        }}
      >
        Try these suggestions
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          maxWidth: 600,
          minHeight: isLoading ? 60 : 'auto',
          alignItems: 'center',
          '& > *': {
            m: 0.25,
          },
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: accent }} />
        ) : (
          suggestions.map(suggestion => (
            <SuggestionChip
              key={suggestion.label}
              icon={<suggestion.icon sx={{ fontSize: 16 }} />}
              label={suggestion.label}
              onClick={() => onSuggestionClick(suggestion.prompt)}
              role="button"
              tabIndex={0}
              aria-label={`Try suggestion: ${suggestion.label}`}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSuggestionClick(suggestion.prompt);
                }
              }}
              sx={{
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${alpha(accent, 0.2)}`,
                },
                '&:focus-visible': {
                  outline: `2px solid ${accent}`,
                  outlineOffset: 2,
                },
              }}
            />
          ))
        )}
      </Stack>

      <Typography
        variant="caption"
        sx={{
          mt: 2,
          color: alpha(theme.palette.text.secondary, 0.5),
          fontSize: '0.65rem',
        }}
      >
        Press Ctrl+B to collapse/expand sidebar • Esc to clear input
      </Typography>
    </Box>
  );
}
