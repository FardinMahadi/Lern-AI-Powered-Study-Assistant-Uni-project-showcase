'use client';

import './styles/RotatingText.css';

import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

import { RotatingText, Squares } from '../shared/rotating-text';

const Hero = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        minHeight: '80vh',
        py: 8,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${alpha(theme.palette.background.default, 0.95)}, ${alpha(theme.palette.background.default, 0.5)})`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Squares
          speed={0.5}
          squareSize={80}
          direction="diagonal"
          borderColor={alpha(theme.palette.divider, isLight ? 0.3 : 0.1)}
          hoverFillColor={alpha(theme.palette.text.primary, isLight ? 0.05 : 0.1)}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 5,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Lern
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="span" sx={{ fontWeight: 500 }}>
            Built to
          </Typography>
          <RotatingText
            texts={['learn', 'recall', 'grow', 'achieve', 'excel']}
            mainClassName="px-3 sm:px-4 md:px-5 bg-accent text-black overflow-hidden py-1 sm:py-1.5 justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography
            variant="body1"
            sx={{
              mt: 6,
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            Your personal learning companion. Master new skills, track your progress, and achieve
            your goals with our intelligent learning platform.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => (window.location.href = '/chat')}
            endIcon={<HiArrowRight />}
            sx={{
              mt: 8,
              px: 6,
              py: 2.5,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;
