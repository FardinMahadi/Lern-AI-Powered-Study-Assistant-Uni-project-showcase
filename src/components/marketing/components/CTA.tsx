'use client';

import React from 'react';
import Link from 'next/link';
import { TiThMenu } from 'react-icons/ti';
import ShinyText from '@/components/shared/ShinyText';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Button, Menu, MenuItem, IconButton } from '@mui/material';

const CTA = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <Box>
      {/* Mobile screen */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton
          onClick={handleClick}
          sx={{
            color: alpha(theme.palette.text.primary, 0.7),
            fontSize: '1.5rem',
          }}
        >
          <TiThMenu />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              width: 208,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, isLight ? 0.3 : 0.5)}`,
              bgcolor: theme.palette.background.paper,
              mt: 1,
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
            },
          }}
        >
          {menuItems.map(item => (
            <MenuItem
              key={item.label}
              component={Link}
              href={item.href}
              onClick={handleClose}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.text.primary,
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                },
                borderRadius: 1,
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </MenuItem>
          ))}
          <Box
            sx={{
              my: 0.5,
              height: '1px',
              bgcolor: alpha(theme.palette.divider, isLight ? 0.3 : 0.5),
            }}
          />
          <MenuItem
            component={Link}
            href="/login"
            onClick={handleClose}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.text.primary,
                bgcolor: 'transparent',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            component={Link}
            href="/signup"
            onClick={handleClose}
            sx={{
              border: `1px solid ${alpha(theme.palette.divider, isLight ? 0.3 : 0.5)}`,
              borderRadius: '999px',
              px: 3,
              py: 0.5,
              bgcolor: theme.palette.background.default,
              '&:hover': {
                bgcolor: alpha(theme.palette.text.primary, isLight ? 0.08 : 0.1),
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ShinyText text="Sign Up" disabled={false} speed={3} />
          </MenuItem>
        </Menu>
      </Box>

      {/* Desktop screen */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
        <Button
          component={Link}
          href="/login"
          sx={{
            color: alpha(theme.palette.text.primary, 0.7),
            textTransform: 'none',
            '&:hover': {
              color: theme.palette.text.primary,
              bgcolor: 'transparent',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Login
        </Button>
        <Button
          component={Link}
          href="/signup"
          variant="outlined"
          sx={{
            borderColor: alpha(theme.palette.divider, isLight ? 0.3 : 0.5),
            borderRadius: '999px',
            px: 3,
            py: 0.5,
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: alpha(theme.palette.divider, isLight ? 0.5 : 0.7),
              bgcolor: alpha(theme.palette.text.primary, isLight ? 0.08 : 0.1),
            },
            transition: 'all 0.2s ease',
          }}
        >
          <ShinyText text="Sign Up" disabled={false} speed={3} />
        </Button>
      </Box>
    </Box>
  );
};

export default CTA;
