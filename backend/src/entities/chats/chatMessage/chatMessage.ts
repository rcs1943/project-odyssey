export default class ChatMessage {
    //#region Attributes
    readonly id: number;
    readonly collaboratorId: number;
    readonly message: string;
    readonly datetime: number;
    //#endregion
    constructor(record: any, chatMessageIdKey: string) {
        this.id = record[chatMessageIdKey];
        this.collaboratorId = record["id_collaborator_sender"];
        this.message = record["message"];
        this.datetime = record["datetime"].getTime();
    }
}