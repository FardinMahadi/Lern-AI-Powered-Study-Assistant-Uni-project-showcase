import { AI_MODELS } from '@/lib/constants';
import CodeIcon from '@mui/icons-material/Code';
import { useTheme, alpha } from '@mui/material/styles';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Avatar, Typography, Stack } from '@mui/material';

import { SuggestionChip } from '../styles';
import { ChatEmptyStateProps } from '../types';

const suggestions = [
  {
    label: 'Explain quantum computing',
    prompt: 'Explain quantum computing in simple terms',
    icon: LightbulbIcon,
  },
  {
    label: 'Write Python code',
    prompt: 'Write a Python function to sort a list',
    icon: CodeIcon,
  },
  {
    label: 'Latest AI trends',
    prompt: 'What are the latest AI trends?',
    icon: TrendingUpIcon,
  },
];

export function ChatEmptyState({ selectedModel, onSuggestionClick }: ChatEmptyStateProps) {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const modelName = AI_MODELS.find(m => m.id === selectedModel)?.name || 'AI';

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
          '& > *': {
            m: 0.25,
          },
        }}
      >
        {suggestions.map(suggestion => (
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
        ))}
      </Stack>

      <Typography
        variant="caption"
        sx={{
          mt: 2,
          color: alpha(theme.palette.text.secondary, 0.5),
          fontSize: '0.65rem',
        }}
      >
        Press Ctrl+B to toggle sidebar • Esc to clear input
      </Typography>
    </Box>
  );
}
