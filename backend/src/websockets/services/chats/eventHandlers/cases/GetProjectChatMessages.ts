import { Socket } from "socket.io";
import WSChatServiceDataHandler from "../../dataHandlers";
import { getWSUserData } from "../../../../utils/helpers";
import { PositiveNumberNonZero } from "../../../../../utils/entities/PositiveNumberNonZero";
import ChatController from "../../../../../controllers/chatController/chat.controller";
import FormattedProjectChatMessages from "../../../../../entities/chats/chatMessage/formattedProjectChatMessage";
import WSChatServiceEvents from "../../events";

export default class GetProjectChatMessages {
    //#region Attributes
    private dataHandler: WSChatServiceDataHandler;
    private socket: Socket;
    private collaboratorId: number;
    private projectId: number;
    //#endregion
    constructor(
        dataHandler: WSChatServiceDataHandler, 
        socket: Socket, body: any
    ) {
        this.dataHandler = dataHandler;
        this.socket = socket;
        this.collaboratorId = getWSUserData(socket).userId;
        this.projectId = new PositiveNumberNonZero(body).value;
    }
    //#region Methods
    async getMessages(): Promise<void> {
        const { socket, collaboratorId, projectId, dataHandler } = this;
        let formattedProjectChatMessages: FormattedProjectChatMessages = dataHandler
            .projectChatMessagesGroup
            .getFormattedProjectChatMessages(projectId);
        // Marcar como visto mensajes
        await ChatController.markProjectChatMessagesAsSeen(
            collaboratorId,
            projectId
        );
        // Verificar si no existen mensajes de este chat
        if (!formattedProjectChatMessages) {
            // Obtener los mensajes a través de una db query
            formattedProjectChatMessages = await ChatController.getProjectChatMessages(projectId);
            // Guardando nuevo chat messages en memoria
            dataHandler
                .projectChatMessagesGroup
                .setFormattedProjectChatMessages(projectId, formattedProjectChatMessages);
        }
        // Enviar preview list al colaborador
        socket.emit(
            WSChatServiceEvents.Server.DispatchProjectChatMessages,
            formattedProjectChatMessages
        );
        dataHandler
            .openProjectChats
            .addCollaboratorToProjectChat(
                projectId, collaboratorId
            );
        this.notifyUnreadChats();
    }
    private async notifyUnreadChats() {
        // Notificando de chats privados sin leer al colaborador
        const hasUnreadChats: boolean = await ChatController.collaboratorHasUnreadProjectChats(this.collaboratorId);
        this.socket.emit(
            WSChatServiceEvents.Server.NotifyUnreadProjectChats,
            hasUnreadChats
        );
    }
    //#endregion
}