import { ProjectChatPreview } from "../../../../../entities/chats/chatPreview/projectChatPreview";

export default class WSProjectChatPreviewGroup {
    //#region Attributes
    private previewChatGroup: Map<number, ProjectChatPreview[]>;
    //#endregion
    constructor() {
        this.previewChatGroup = new Map<number, ProjectChatPreview[]>();
    }
    //#region Methods
    getPreviewChat(collaboratorId: number): ProjectChatPreview[] {
        return this.previewChatGroup.get(collaboratorId);
    }
    addPreviewChat(collaboratorId: number, previewChat: ProjectChatPreview[]): void {
        this.previewChatGroup.set(collaboratorId, previewChat);
    }
    //#endregion
}