import { Message } from '@/types';
import { ChatResponse } from '@/types/api';
import apiClient from '@/lib/api/api-client';

export interface SendMessageParams {
  messages: Message[];
  model: string;
}

export interface ChatService {
  sendMessage: (params: SendMessageParams) => Promise<ChatResponse>;
}

class ChatServiceImpl implements ChatService {
  async sendMessage({ messages, model }: SendMessageParams): Promise<ChatResponse> {
    return apiClient.post<ChatResponse>('/chat', {
      messages: messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
      model,
    });
  }
}

export const chatService: ChatService = new ChatServiceImpl();
export default chatService;
