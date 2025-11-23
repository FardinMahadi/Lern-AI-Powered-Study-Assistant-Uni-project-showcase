'use client';

import BoltIcon from '@mui/icons-material/Bolt';
import LockIcon from '@mui/icons-material/Lock';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartIcon from '@mui/icons-material/BarChart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

const features = [
  {
    icon: SmartToyIcon,
    title: 'AI-Powered Learning',
    description:
      'Leverage advanced AI models to get instant answers and explanations on any topic.',
  },
  {
    icon: AutoAwesomeIcon,
    title: 'Smart Conversations',
    description:
      'Multi-turn conversations with context awareness for natural, flowing interactions.',
  },
  {
    icon: SpeedIcon,
    title: 'Lightning Fast',
    description: 'Powered by Groq infrastructure for ultra-low latency responses.',
  },
  {
    icon: LockIcon,
    title: 'Secure & Private',
    description: 'Your conversations are encrypted and never shared with third parties.',
  },
  {
    icon: BarChartIcon,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed statistics and insights.',
  },
  {
    icon: BoltIcon,
    title: 'Instant Access',
    description: 'No setup required. Start learning immediately after signing up.',
  },
];

export default function FeaturesPage() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
              Powerful Features for Smarter Learning
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Discover everything Lern has to offer to enhance your learning experience
            </Typography>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={3}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(0,217,255,0.05) 0%, rgba(110,89,240,0.05) 100%)'
                          : 'linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(110,89,240,0.08) 100%)',
                      border: `1px solid ${
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.08)'
                      }`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'primary.main',
                        boxShadow: `0 8px 24px ${
                          theme.palette.mode === 'dark'
                            ? 'rgba(0,217,255,0.15)'
                            : 'rgba(0,217,255,0.2)'
                        }`,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* CTA Section */}
          <Box
            sx={{
              mt: 6,
              p: { xs: 3, md: 4 },
              bgcolor:
                theme.palette.mode === 'dark' ? 'rgba(0,217,255,0.08)' : 'rgba(0,217,255,0.12)',
              border: `1px solid ${
                theme.palette.mode === 'dark' ? 'rgba(0,217,255,0.2)' : 'rgba(0,217,255,0.3)'
              }`,
              borderRadius: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Ready to transform your learning?
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              Join thousands of users already enjoying a smarter way to learn
            </Typography>
            <Chip
              label="Get Started Free"
              onClick={() => {}}
              sx={{
                px: 3,
                py: 3,
                fontSize: '1rem',
                fontWeight: 600,
                bgcolor: 'primary.main',
                color: theme.palette.mode === 'dark' ? 'rgba(10, 10, 10, 1)' : 'white',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
