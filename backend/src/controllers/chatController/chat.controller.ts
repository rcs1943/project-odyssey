import { RelationCollaboratorChat } from "../../entities/chats/chatMessage/chatCollaboratorRelation";
import FormattedProjectChatMessages from "../../entities/chats/chatMessage/formattedProjectChatMessage";
import PrivateChatMessage from "../../entities/chats/chatMessage/privateChatMessage";
import ProjectChatMessage from "../../entities/chats/chatMessage/projectChatMessage";
import { PrivateChatPreview } from "../../entities/chats/chatPreview/privateChatPreview";
import { ProjectChatPreview } from "../../entities/chats/chatPreview/projectChatPreview";
import ChatModel from "../../models/chatModel/chat.model";
import WSPrivateMessage from "../../websockets/services/chats/utils/entities/privateMessage";
import WSProjectMessage from "../../websockets/services/chats/utils/entities/projectMessage";

export default abstract class ChatController {
    static async searchPrivateChatPreview(
        collaboratorId: number,
        searchedCollaborator: string
    ): Promise<PrivateChatPreview[]> {
        const resultset: any[] = await ChatModel.searchPrivateChatPreview(
            collaboratorId,
            searchedCollaborator
        );
        return resultset.map(record => new PrivateChatPreview(record));
    }
    static async getPrivateChatPreviewWithMessages(collaboratorId: number): Promise<PrivateChatPreview[]> {
        const resultset: any[] = await ChatModel.getPrivateChatPreviewWithMessages(collaboratorId);
        return resultset.map(record => new PrivateChatPreview(record));
    }
    static async searchProjectChatPreview(
        collaboratorId: number,
        searchedProject: string
    ): Promise<ProjectChatPreview[]> {
        const resultset: any[] = await ChatModel.searchProjectChatPreview(
            collaboratorId,
            searchedProject
        );
        return resultset.map(record => new ProjectChatPreview(record));
    }
    static async getProjectChatPreviewListWithMessages(projectId: number): Promise<ProjectChatPreview[]> {
        const resultset: any[] = await ChatModel.getProjectChatMessages(projectId);
        return resultset.map(record => new ProjectChatPreview(record));
    }
    static async getPrivateChatMessages(
        collaboratorId: number, 
        collaboratorChatId: number
    ): Promise<PrivateChatMessage[]> {
        const resultset: any[] = await ChatModel.getPrivateChatMessages(
            collaboratorId,
            collaboratorChatId
        );
        return resultset.map(record => new PrivateChatMessage(record));
    }
    static async getRelationCollaboratorInPrivateChat(collaboratorId: number, collaboratorChatId: number): Promise<RelationCollaboratorChat[]> {
        const resultset: any[] = await ChatModel.getRelationCollaboratorInPrivateChat(
            collaboratorId,
            collaboratorChatId
        );
        return resultset.map(record => new RelationCollaboratorChat(record));
    }
    static async getProjectChatMessages(projectId: number): Promise<FormattedProjectChatMessages> {
        const resultset: any[] = await ChatModel.getProjectChatMessages(projectId);
        return new FormattedProjectChatMessages(resultset);
    }
    static async markPrivateChatMessagesAsSeen(
        collaboratorId: number,
        collaboratorChatId: number
    ): Promise<void> {
        await ChatModel.markPrivateChatMessagesAsSeen(
            collaboratorId,
            collaboratorChatId
        );
    }
    static async markProjectChatMessagesAsSeen(
        collaboratorId: number,
        projectId: number
    ): Promise<void> {
        await ChatModel.markProjectChatMessagesAsSeen(
            collaboratorId,
            projectId
        );
    }
    static async sendMessageToPrivateChat(
        senderId: number,
        privateMessage: WSPrivateMessage
    ): Promise<PrivateChatMessage> {
        const record: any = await ChatModel.sendMessageToPrivateChat(
            senderId,
            privateMessage
        );
        return new PrivateChatMessage(record);
    }
    static async collaboratorHasUnreadPrivateChats(
        collaboratorId: number
    ): Promise<boolean> {
        const record: any = await ChatModel.collaboratorHasUnreadPrivateChats(collaboratorId);
        return Boolean(record["has_unread_chats"]);
    }
    static async collaboratorHasUnreadProjectChats(
        collaboratorId: number
    ): Promise<boolean> {
        const record: any = await ChatModel.collaboratorHasUnreadProjectChats(collaboratorId);
        return Boolean(record["has_unread_chats"]);
    }
    static async sendMessageToProjectChat(
        senderId: number,
        projectMessage: WSProjectMessage
    ): Promise<ProjectChatMessage> {
        const record: any = await ChatModel.sendMessageToProjectChat(
            senderId,
            projectMessage
        );
        if (!record)
            throw new Error("It can't be saved project chat message");
        return new ProjectChatMessage(record);
    }
}