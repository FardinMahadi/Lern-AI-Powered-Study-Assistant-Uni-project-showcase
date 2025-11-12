"use client";

import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { School, Lightbulb, Users, Target } from "@mui/icons-material";

const values = [
  {
    icon: School,
    title: "Education First",
    description:
      "We believe education should be accessible, affordable, and personalized for everyone.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously innovate to provide the best AI-powered learning experiences.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster a vibrant community of learners supporting each other.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from product to support.",
  },
];

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    description: "AI researcher with 10+ years of experience in machine learning.",
  },
  {
    name: "Sarah Williams",
    role: "CTO",
    description: "Full-stack engineer passionate about building scalable learning platforms.",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product",
    description: "Product strategist focused on user-centric learning experiences.",
  },
];

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ textAlign: "center" }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
              About Lern
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
              Transforming education through AI-powered learning experiences
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  We&apos;re on a mission to democratize AI-powered learning and make it accessible
                  to everyone, regardless of background or location.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Through intelligent conversations and personalized learning paths, we help
                  students, professionals, and lifelong learners achieve their educational goals
                  faster and more effectively.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  bgcolor:
                    theme.palette.mode === "dark" ? "rgba(0,217,255,0.08)" : "rgba(0,217,255,0.12)",
                  borderRadius: 3,
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "rgba(0,217,255,0.2)" : "rgba(0,217,255,0.3)"
                  }`,
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                  50K+
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Active Learners
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Our Values
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                These principles guide everything we do
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        background: "transparent",
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.08)"
                        }`,
                      }}
                    >
                      <CardContent>
                        <Box sx={{ mb: 2 }}>
                          <Icon sx={{ fontSize: 32, color: "primary.main" }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {value.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Meet Our Team
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Passionate about transforming education through technology
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {team.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      background: "transparent",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)"
                      }`,
                    }}
                  >
                    <CardContent>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          mx: "auto",
                          mb: 2,
                          bgcolor: "primary.main",
                          fontSize: "2rem",
                        }}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {member.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "primary.main", fontWeight: 600, mb: 2 }}
                      >
                        {member.role}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          py: { xs: 4, md: 8 },
          bgcolor: theme.palette.mode === "dark" ? "rgba(0,217,255,0.08)" : "rgba(0,217,255,0.12)",
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Have questions or feedback? We&apos;d love to hear from you.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "primary.main", mt: 2 }}>
              hello@lern.ai
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
