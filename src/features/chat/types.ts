import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Message } from '@/types';

export interface ChatEmptyStateProps {
  selectedModel: string;
  onSuggestionClick: (suggestion: string) => void;
}

export interface ChatInputAreaProps {
  input: string;
  isLoading: boolean;
  messageCount: number;
  onInputChange: (value: string) => void;
  onAttachmentSelect?: (files: FileList) => void;
  onClearInput?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
}

export interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export interface ChatError {
  message: string;
  code?: string;
  retryable?: boolean;
}

export type CodeProps = ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
};
