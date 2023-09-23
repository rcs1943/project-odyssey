import { ProjectForm } from "src/entities/project/entities";

export type CreateProjectRequestBody = {
    userId: number;
    project: ProjectForm;
};
export type DeleteProjectRequestBody = {
    userId: number;
    projectId: number;
};
export type UpdateProjectEndDateRequestBody = {
    projectId: number;
    endDate: number;
}