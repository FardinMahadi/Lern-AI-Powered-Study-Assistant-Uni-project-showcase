import { Box, Avatar, Typography, Stack, Fade, CircularProgress } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ReactMarkdown from "react-markdown";
import { Message } from "@/types";
import { AI_MODELS } from "@/lib/constants";
import { MessageBubble, BRAND_COLORS } from "../ChatStyles";
import markdownComponents from "../markdownComponents";

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatMessageList({ messages, isLoading, messagesEndRef }: ChatMessageListProps) {
  return (
    <Stack spacing={3}>
      {messages.map((message) => (
        <Fade in key={message.id} timeout={500}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {message.role === "assistant" && (
              <Avatar
                sx={{
                  bgcolor: BRAND_COLORS.accent,
                  color: BRAND_COLORS.neutralDark,
                }}
              >
                <SmartToyIcon />
              </Avatar>
            )}

            <MessageBubble isUser={message.role === "user"}>
              <Box sx={{ "& > *:last-child": { mb: 0 } }}>
                <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
              </Box>
              {message.role === "assistant" && message.model && (
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)" }}>
                    {AI_MODELS.find((m) => m.id === message.model)?.name}
                  </Typography>
                </Box>
              )}
            </MessageBubble>

            {message.role === "user" && (
              <Avatar
                sx={{
                  bgcolor: BRAND_COLORS.surfaceMedium,
                  color: "#F7F9FB",
                }}
              >
                <PersonIcon />
              </Avatar>
            )}
          </Box>
        </Fade>
      ))}

      {isLoading && (
        <Fade in>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}>
            <Avatar
              sx={{
                bgcolor: BRAND_COLORS.accent,
                color: BRAND_COLORS.neutralDark,
              }}
            >
              <SmartToyIcon />
            </Avatar>
            <MessageBubble>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CircularProgress size={8} sx={{ color: BRAND_COLORS.accent }} />
                <CircularProgress
                  size={8}
                  sx={{ color: BRAND_COLORS.accent, animationDelay: "0.15s" }}
                />
                <CircularProgress
                  size={8}
                  sx={{ color: BRAND_COLORS.accent, animationDelay: "0.3s" }}
                />
              </Stack>
            </MessageBubble>
          </Box>
        </Fade>
      )}

      <div ref={messagesEndRef} />
    </Stack>
  );
}
