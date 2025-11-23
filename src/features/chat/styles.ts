import { alpha, styled } from '@mui/material/styles';
import { Box, TextField, Select, Chip } from '@mui/material';

export const MessageBubble = styled(Box, {
  shouldForwardProp: prop => prop !== 'isUser',
})<{ isUser?: boolean }>(({ theme, isUser }) => {
  const primary = theme.palette.primary.main;
  const surface = theme.palette.background.paper;
  const textOnPrimary = theme.palette.getContrastText(primary);

  return {
    width: 'fit-content',
    maxWidth: 'min(72%, 680px)',
    minWidth: '100px',
    padding: theme.spacing(1.5, 1.75),
    borderRadius: theme.spacing(1.5),
    backgroundColor: isUser ? primary : alpha(surface, 0.7),
    color: isUser ? textOnPrimary : theme.palette.text.primary,
    border: isUser ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.4)}`,
    boxShadow: isUser
      ? `0 2px 8px ${alpha(primary, 0.2)}`
      : `0 1px 4px ${alpha(theme.palette.common.black, 0.04)}`,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    fontSize: '0.8rem',
    lineHeight: 1.45,
    transition: 'all 0.2s ease-in-out',
    backdropFilter: isUser ? 'none' : 'blur(6px)',
    outline: 'none',
    '&:focus-visible': {
      outline: `2px solid ${isUser ? textOnPrimary : primary}`,
      outlineOffset: 2,
    },

    // Responsive sizing
    [theme.breakpoints.down('lg')]: {
      maxWidth: '75%',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '82%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      padding: theme.spacing(1.25, 1.5),
      borderRadius: theme.spacing(1.25),
    },
  };
});

export const SuggestionChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(0.75, 1.5),
  height: 'auto',
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  color: theme.palette.text.primary,
  fontSize: '0.75rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  outline: 'none',

  '& .MuiChip-icon': {
    color: theme.palette.primary.main,
    fontSize: 16,
    marginLeft: theme.spacing(0.375),
  },

  '& .MuiChip-label': {
    padding: `0 ${theme.spacing(0.75)}`,
  },

  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    borderColor: alpha(theme.palette.primary.main, 0.3),
    transform: 'translateY(-1px)',
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.25),
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.95 : 1
    ),
    border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
    transition: 'all 0.2s ease-in-out',

    '& fieldset': {
      border: 'none',
    },

    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 1),
      borderColor: alpha(theme.palette.primary.main, 0.35),
      boxShadow: `0 1px 4px ${alpha(theme.palette.common.black, 0.04)}`,
    },

    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}`,
    },

    '&.Mui-error': {
      borderColor: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.main, 0.05),

      '&.Mui-focused': {
        boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.12)}`,
      },
    },
  },

  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    fontSize: '0.8rem',
    lineHeight: 1.45,
    padding: theme.spacing(1.25, 1.5),

    '&::placeholder': {
      color: alpha(theme.palette.text.secondary, 0.6),
      opacity: 1,
      fontSize: '0.75rem',
    },
  },

  '& .MuiInputBase-inputMultiline': {
    padding: 0,
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: theme.spacing(1.25),
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.95 : 1),
  border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease-in-out',
  outline: 'none',

  '& .MuiSelect-select': {
    padding: theme.spacing(1, 1.25),
    fontSize: '0.8rem',
    fontWeight: 500,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },

  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 1),
    borderColor: alpha(theme.palette.primary.main, 0.35),
    boxShadow: `0 1px 4px ${alpha(theme.palette.common.black, 0.04)}`,
  },

  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}`,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },

  '& .MuiSvgIcon-root': {
    color: alpha(theme.palette.text.secondary, 0.7),
    fontSize: 18,
  },
}));
