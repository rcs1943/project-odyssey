import { User } from "src/entities/user/types";

export type GetCollaboratorsRequestBody = {
    searchedCollaborator: string;
    page: number;
};
export type GetCollaboratorsResponseRequest = {
    list: User[];
    count: number;
};
export type CheckCredentialsRequestBody = {
    username: string;
    password: string;
};
export type CreateCollaboratorBody = {
    name: string;
    surname: string;
    email: string;
    photoInBase64: string | null;
    username: string;
    password: string;
};
export type UpdateCollaboratorBody = {
    id?: number;
    name: string;
    surname: string;
    email: string;
    photo: UpdateCollaboratorPhoto;
    username: string;
    password?: string | null;
};
type UpdateCollaboratorPhoto = {
    base64: string | null;
    changePhoto: boolean;
};
export type UpdatePasswordRequestBody = {
    collaboratorId: number;
    photoInBase64: string | null;
}
export type ChangePasswordRequestBody = {
    collaboratorId: number;
    newPassword: string;
}