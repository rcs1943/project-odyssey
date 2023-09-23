import { ReactNode } from "react";
import WSChatTab from "src/services/websockets/services/chats/utils/enums";

export type ChatListByTab = Record<WSChatTab, ReactNode>;
export type SearchChatPayload = {
    searchedChat: string;
    chatTab: WSChatTab;
};
export type PreviewChatListProps<T> = {
    chatPreviewList: T[];
    getChatMessages: (previewChat: T) => void;
    searchedChat: string;
};
export type ChatPanelProps = {
    onNotifyCollaboratorConnectionState: () => void;
};