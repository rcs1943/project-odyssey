import { CollaboratorUser, ProjectCollaborator } from "../collaborator/entities";
import { ProjectState } from "./enums";

export type UpdateEndDateProjectRequestBody = {
    projectId: number;
    endDate: number;
};
export type SearchCollaboratorRequestBody = {
    projectId: number;
    collaboratorName: string;
};
export type AddProjectMembersRequestBody = {
    projectId: number;
    membersIds: number[];
};
export type DeleteProjectMemberRequestBody = {
    userId: number;
    projectHasMemberId: number;
};
export type ProjectBase = {
    name: string;
    description: string;
    startDate: number;
    endDate: number;
};
export type Project = ProjectBase & {
    id: number;
    state: ProjectState;
    leader?: CollaboratorUser;
    projectMemberCount: number;
};
export type ProjectForm = ProjectBase & {
    id?: number;
    leaderId: number;
};
export type GroupedProjectList = {
    recents: Project[];
    all: Project[];
};
export type ProjectDetails = {
    id: number;
    name: string;
    description: string;
    period: string;
    endDate: number;
    state: string;
    collaborators: ProjectCollaborator[];
};
export type ProjectDetailsForPanel = {
    id: number;
    name: string;
    state: string;
    projectRoleId: string;
};
