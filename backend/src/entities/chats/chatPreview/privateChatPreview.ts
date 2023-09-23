import { PrivateChatPreviewCollaborator } from "../entities";
import { LastMessageChatPreview } from "./lastMessageChatPreview";

export class PrivateChatPreview {
    readonly collaborator: PrivateChatPreviewCollaborator;
    readonly lastMessage: LastMessageChatPreview | null;
    constructor(record: any) {
        this.collaborator = {
            id: record["id_collaborator"],
            name: record["collaborator_name"],
            surname: record["collaborator_surname"],
            urlPhoto: record["collaborator_url_photo"]
        };
        const senderId: number | null = record["last_message_id_sender"];
        this.lastMessage = senderId ? new LastMessageChatPreview(record) : null;
    }
};