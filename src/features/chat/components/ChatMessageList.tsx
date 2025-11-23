import type { Message } from "@/types";

import remarkGfm from "remark-gfm";
import { AI_MODELS } from "@/lib/constants";
import { alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useRef, useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Markdown } from "@/components/shared/Markdown";
import { Box, Avatar, Typography, Stack, Fade, Divider } from "@mui/material";

import { MessageBubble } from "../styles";
import { ChatMessageListProps } from "../types";

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDayLabel = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatTimeLabel = (date: Date) =>
  date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

const getMessageKey = (message: Message, index: number) =>
  `${message.id ?? `idx-${index}`}-${message.timestamp instanceof Date ? message.timestamp.getTime() : index}`;

// Adaptive typing speed based on content length
const getTypingSpeed = (contentLength: number) => {
  if (contentLength < 100) return 25;
  if (contentLength < 500) return 18;
  if (contentLength < 1000) return 12;
  return 8;
};

const MIN_BUBBLE_WIDTH = 140;
const MAX_BUBBLE_WIDTH = 680;

const estimateBubbleWidth = (content: string) => {
  const sanitizedLines = content
    .split(/\r?\n/)
    .map((line) => line.replace(/[`*_>#\-]/g, "").trim());

  const longestLine = sanitizedLines.reduce((max, line) => Math.max(max, line.length), 0);

  const effectiveLength = Math.max(longestLine, Math.ceil(content.length * 0.45));
  const estimated = MIN_BUBBLE_WIDTH + Math.sqrt(effectiveLength) * 40;
  const clamped = Math.min(MAX_BUBBLE_WIDTH, Math.max(MIN_BUBBLE_WIDTH, estimated));
  return `${Math.round(clamped)}px`;
};

function TypewriterContent({
  message,
  animate,
  onComplete,
}: {
  message: Message;
  animate: boolean;
  onComplete?: () => void;
}) {
  const { role, content } = message;
  const [displayed, setDisplayed] = useState(animate && role === "assistant" ? "" : content);
  const [isTyping, setIsTyping] = useState(animate && role === "assistant");

  useEffect(() => {
    if (!animate || role !== "assistant") {
      setDisplayed(content);
      setIsTyping(false);
      return;
    }

    let index = 0;
    setDisplayed("");
    setIsTyping(true);

    if (content.length === 0) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    const typingSpeed = getTypingSpeed(content.length);
    const chunkSize = content.length > 600 ? 10 : 5;

    const interval = setInterval(() => {
      index += 1;
      if (index % chunkSize === 0 || index >= content.length) {
        setDisplayed(content.slice(0, index));
      }
      if (index >= content.length) {
        clearInterval(interval);
        setIsTyping(false);
        onComplete?.();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [animate, content, role, onComplete]);

  if (role !== "assistant" || !isTyping) {
    return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Markdown remarkPlugins={[remarkGfm]}>{displayed || " "}</Markdown>
      <Box
        component="span"
        sx={{
          position: "absolute",
          bottom: 0,
          left: "calc(100% + 6px)",
          width: 10,
          height: 18,
          borderRadius: "2px",
          backgroundColor: (theme) => theme.palette.text.primary,
          opacity: 0.7,
          animation: "typeCursor 1s steps(2, end) infinite",
          "@keyframes typeCursor": {
            "0%, 100%": { opacity: 0 },
            "50%": { opacity: 1 },
          },
        }}
      />
    </Box>
  );
}

// Enhanced Loading Indicator with animated dots
function TypingIndicator() {
  return (
    <Box sx={{ display: "flex", gap: 0.75, py: 1.5, px: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: (theme) => theme.palette.primary.main,
            animation: "bounce 1.4s ease-in-out infinite",
            animationDelay: `${i * 0.16}s`,
            "@keyframes bounce": {
              "0%, 80%, 100%": {
                transform: "scale(0)",
                opacity: 0.3,
              },
              "40%": {
                transform: "scale(1)",
                opacity: 1,
              },
            },
          }}
        />
      ))}
    </Box>
  );
}

export function ChatMessageList({ messages, isLoading, messagesEndRef }: ChatMessageListProps) {
  const animatedMessagesRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && messages.length > 0) {
      messages.forEach((message, index) => {
        if (message.role === "assistant") {
          const key = getMessageKey(message, index);
          animatedMessagesRef.current.add(key);
        }
      });
      initializedRef.current = true;
    }
  }, [messages]);

  const nodes: React.ReactNode[] = [];
  let lastDateKey: string | null = null;

  messages.forEach((message, index) => {
    const messageDate = new Date(message.timestamp);
    const isValidDate = !Number.isNaN(messageDate.getTime());
    const dateKey = isValidDate ? messageDate.toISOString().split("T")[0] : `invalid-${index}`;
    const shouldShowDivider = isValidDate && dateKey !== lastDateKey;

    if (shouldShowDivider) {
      lastDateKey = dateKey;
      nodes.push(
        <Divider
          key={`divider-${dateKey}-${index}`}
          textAlign="center"
          sx={{
            my: 3,
            "&::before, &::after": {
              borderColor: (theme) => alpha(theme.palette.divider, 0.2),
            },
            "& .MuiDivider-wrapper": {
              px: 2.5,
              py: 0.75,
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
              borderRadius: 2,
              backdropFilter: "blur(8px)",
              border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: (theme) => alpha(theme.palette.text.secondary, 0.8),
            }}
          >
            {formatDayLabel(messageDate)}
          </Typography>
        </Divider>
      );
    }

    const isUser = message.role === "user";
    const modelName = message.model
      ? (AI_MODELS.find((m) => m.id === message.model)?.name ?? message.model)
      : undefined;
    const timeLabel = isValidDate ? formatTimeLabel(messageDate) : undefined;
    const messageKey = getMessageKey(message, index);
    const shouldAnimate =
      message.role === "assistant" && !animatedMessagesRef.current.has(messageKey);

    nodes.push(
      <Fade in key={messageKey} timeout={500}>
        <Box
          sx={{
            display: "flex",
            gap: 1.25,
            justifyContent: isUser ? "flex-end" : "flex-start",
          }}
        >
          {message.role === "assistant" && (
            <Avatar
              sx={{
                bgcolor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
                width: 36,
                height: 36,
                boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <SmartToyIcon fontSize="small" />
            </Avatar>
          )}

          <MessageBubble isUser={isUser} sx={{ maxWidth: estimateBubbleWidth(message.content) }}>
            <Box sx={{ "& > *:last-child": { mb: 0 } }}>
              <TypewriterContent
                message={message}
                animate={shouldAnimate}
                onComplete={() => animatedMessagesRef.current.add(messageKey)}
              />
            </Box>

            {(timeLabel || modelName) && (
              <Box
                sx={{
                  mt: 1.5,
                  pt: 1.25,
                  borderTop: (theme) =>
                    `1px solid ${alpha(theme.palette.divider, isUser ? 0.2 : 0.15)}`,
                  display: "flex",
                  gap: 1.5,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {modelName && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 1.5,
                      bgcolor: (theme) =>
                        isUser
                          ? alpha(theme.palette.common.black, 0.15)
                          : alpha(theme.palette.primary.main, 0.12),
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 13, opacity: 0.8 }} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {modelName}
                    </Typography>
                  </Box>
                )}
                {timeLabel && (
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      letterSpacing: "0.04em",
                      fontSize: "0.7rem",
                    }}
                  >
                    {timeLabel}
                  </Typography>
                )}
              </Box>
            )}
          </MessageBubble>

          {isUser && (
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08),
                color: (theme) => theme.palette.text.primary,
                width: 34,
                height: 34,
              }}
            >
              <PersonIcon fontSize="small" />
            </Avatar>
          )}
        </Box>
      </Fade>
    );
  });

  if (isLoading) {
    nodes.push(
      <Fade in key="loading-indicator">
        <Box sx={{ display: "flex", gap: 1.25, justifyContent: "flex-start" }}>
          <Avatar
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
              width: 36,
              height: 36,
              boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <SmartToyIcon fontSize="small" />
          </Avatar>
          <MessageBubble>
            <TypingIndicator />
          </MessageBubble>
        </Box>
      </Fade>
    );
  }

  nodes.push(<div key="messages-end" ref={messagesEndRef} />);

  return <Stack spacing={2.5}>{nodes}</Stack>;
}
