"use client";

import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { CheckCircle, RocketLaunch } from "@mui/icons-material";

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "5 conversations per day",
      "Basic AI models",
      "Text-based responses",
      "Community support",
      "7-day conversation history",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9.99",
    description: "For serious learners",
    features: [
      "Unlimited conversations",
      "Advanced AI models",
      "Priority support",
      "30-day conversation history",
      "Export conversations",
      "Custom model selection",
      "Advanced analytics",
    ],
    highlighted: true,
  },
  {
    name: "Advanced",
    price: "24.99",
    description: "For power users",
    features: [
      "Everything in Pro",
      "API access",
      "Custom integrations",
      "Unlimited history",
      "Dedicated account manager",
      "Custom AI training",
      "Advanced security features",
      "Early access to new features",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
              Choose the perfect plan for your learning needs. Always flexible, always fair.
            </Typography>
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={3}>
            {tiers.map((tier, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    background:
                      tier.highlighted && theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, rgba(0,217,255,0.1) 0%, rgba(110,89,240,0.1) 100%)"
                        : tier.highlighted
                          ? "linear-gradient(135deg, rgba(0,217,255,0.15) 0%, rgba(110,89,240,0.15) 100%)"
                          : undefined,
                    border: `1px solid ${
                      tier.highlighted
                        ? theme.palette.primary.main
                        : theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)"
                    }`,
                    transform: tier.highlighted ? "scale(1.05)" : "scale(1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: `0 8px 24px ${
                        theme.palette.mode === "dark"
                          ? "rgba(0,217,255,0.2)"
                          : "rgba(0,217,255,0.3)"
                      }`,
                    },
                  }}
                >
                  {tier.highlighted && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: "primary.main",
                        color: theme.palette.mode === "dark" ? "rgba(10, 10, 10, 1)" : "white",
                        px: 2,
                        py: 0.5,
                        borderRadius: 999,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <RocketLaunch sx={{ fontSize: 14 }} />
                      MOST POPULAR
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {tier.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                      {tier.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, display: "inline" }}>
                        ${tier.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          display: "inline",
                          ml: 1,
                        }}
                      >
                        /month
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant={tier.highlighted ? "contained" : "outlined"}
                      sx={{ mb: 3 }}
                    >
                      Get Started
                    </Button>

                    <List sx={{ p: 0 }}>
                      {tier.features.map((feature, i) => (
                        <ListItem key={i} sx={{ p: 0, mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle
                              sx={{
                                fontSize: 20,
                                color: "primary.main",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* FAQ Section */}
          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Have questions?
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Contact our support team at{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                support@lern.ai
              </Box>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
