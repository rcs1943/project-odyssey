import { useEffect } from "react";
import ChatRoom from "../ChatRoom/ChatRoom";
import ChatHeader from "../ChatRoom/components/ChatHeader/ChatHeader";
import ChatWindow from "../ChatRoom/components/ChatWindow/ChatWindow";
import MessageBox from "../ChatRoom/components/MessageBox/MessageBox";
import UserImage from "src/views/components/UserImage/UserImage";
import WSChatServiceEvents from "src/services/websockets/services/chats/events";
import AdditionalPrivateChatInfo from "./components/AdditionalPrivateChatInfo";
import useChatViewContext from "../../utils/context/useChatViewContext";
import useMasterRouterContext from "src/routes/utils/context/useMasterRouterContext";
import ConnectionData from "./components/ConnectionData";
import { PrivateChatRoomProps } from "./types";

const PrivateChatRoom = ({
    isOnlineCollaboratorChat
}: PrivateChatRoomProps) => {
    const { 
        currentPrivateChatHandler, 
        privateChatMessagesHandler 
    } = useChatViewContext();
    const { value: currentChat } = currentPrivateChatHandler;
    const { 
        formattedMessages, 
        clearMessages 
    } = privateChatMessagesHandler;
    const { socketIoChatService } = useMasterRouterContext().chatServiceHandler;
    useEffect(() => {
        return () => {
            socketIoChatService?.off(WSChatServiceEvents.Server.NotifyCollaboratorOnlineState);
        };
    }, []);
    if (!formattedMessages || !currentChat) return null;
    const closeChat = (): void => {
        clearMessages();
        currentPrivateChatHandler.clear();
    };
    const { collaborator } = currentChat;
    const sendMessage = (messageText: string): void => {
        const message = {
            receiverId: collaborator.id,
            content: messageText,
        };
        socketIoChatService?.emit(
            WSChatServiceEvents.Collaborator.SendMessageToPrivateChat,
            message
        );
    };
    return (
        <ChatRoom
            render={
                <>
                <ChatHeader
                    title={`${collaborator.name} ${collaborator.surname}`}
                    subtitle={<ConnectionData isOnline={isOnlineCollaboratorChat}/>}
                    portrait={
                        <UserImage
                            name={collaborator.name}
                            surname={collaborator.surname}
                            urlPhoto={collaborator.urlPhoto}
                            className="medium"/>}
                    closeChat={closeChat}/>
                <ChatWindow
                    messages={formattedMessages.messages}
                    additionalChatInfo={
                        <AdditionalPrivateChatInfo
                            collaboratorRelationList={
                                formattedMessages.collaboratorRelationList
                            }/>}/>
                <MessageBox emitMessageEvent={sendMessage}/>
                </>}/>
    );
};

export default PrivateChatRoom;
