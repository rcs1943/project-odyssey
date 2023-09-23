import DBConnection from "../../db";
import { StoredProcedures } from "../../db/storedProcedures";
import { SearchCollaboratorRequestBody } from "../../routes/collaborator/types";
import {
    WSProjectTaskWithNewStateForm,
    WSProjectTaskToBeDeletedForm,
    WSNewProjectTaskForm,
    WSProjectTaskCommentForm,
    WSProjectTaskMainInformationForm,
    WSProjectSubtaskToBeDeletedForm,
    WSSubtaskToBeUpdatedForm,
    WSSubtaskToBeSwitchedCheckStatusForm,
    WSNewProjectSubtaskForm,
    WSProjectTaskForm
} from "../../websockets/services/projectTasks/utils/entities";

export default abstract class ProjectTasksModel {
    static async getTaskPriorities(): Promise<any[]> {
        const [resultset] = await DBConnection.query(
            StoredProcedures.GetProjectTaskPriorities,
            []);
        return resultset;
    }
    static async searchProjectTeamMember({
        projectId,
        collaboratorName
    }: SearchCollaboratorRequestBody): Promise<any[]> {
        const [resultset] = await DBConnection.query(
            StoredProcedures.SearchProjectTeamMember,
            [
                projectId,
                collaboratorName
            ]);
        return resultset;
    }
    static async getTaskBoardByProjectId({
        projectId, collaboratorId
    }: WSProjectTaskForm): Promise<any[]> {
        const [resultset] = await DBConnection.query(
            StoredProcedures.GetProjectTaskBoard,
            [projectId, collaboratorId]);
        return resultset;
    }
    static async createTask({
        collaboratorId,
        projectId, payload: task
    }: WSNewProjectTaskForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.CreateProjectTask,
            [
                projectId,
                collaboratorId,
                task.name,
                task.state
            ]
        );
        return record;
    }
    static async updateTaskMainInformation({
        projectId,
        payload: taskMainInformation,
        collaboratorId
    }: WSProjectTaskMainInformationForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.UpdateProjectTaskMainInformation,
            [
                projectId,
                collaboratorId,
                taskMainInformation.taskId,
                taskMainInformation.responsibleId,
                taskMainInformation.name,
                taskMainInformation.description,
                taskMainInformation.deadline > 0
                    ? new Date(taskMainInformation.deadline)
                    : null,
                taskMainInformation.priorityId
            ]
        );
        return record;
    }
    
    static async createSubtask({
        collaboratorId,
        payload: newSubtask,
        projectId
    }: WSNewProjectSubtaskForm) {
        const [[record]] = await DBConnection.query(
            StoredProcedures.CreateProjectSubtask,
            [
                projectId,
                collaboratorId,
                newSubtask.taskId,
                newSubtask.name,
            ]
        );
        return record;
    }
    static async updateSubtask({
        projectId,
        payload: subtask,
        collaboratorId
    }: WSSubtaskToBeUpdatedForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.UpdateProjectSubtask,
            [
                projectId,
                collaboratorId,
                subtask.subtaskId,
                subtask.name
            ]
        );
        return record;
    }
    static async switchCheckStatusSubtask({
        projectId,
        payload: subtask,
        collaboratorId
    }: WSSubtaskToBeSwitchedCheckStatusForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.SwitchCheckStatusSubtask,
            [
                projectId,
                collaboratorId,
                subtask.subtaskId,
                subtask.checked
            ]
        );
        return record;
    }
    static async deleteSubtask({
        projectId,
        payload: subtaskId,
        collaboratorId
    }: WSProjectSubtaskToBeDeletedForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.DeleteProjectSubtask,
            [
                projectId,
                collaboratorId,
                subtaskId
            ]);
        return record;
    }
    static async changeTaskState({
        projectId,
        payload: task,
        collaboratorId
    }: WSProjectTaskWithNewStateForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.ChangeProjectTaskState,
            [
                projectId,
                collaboratorId,
                task.taskId,
                task.state
            ]
        );
        return record;
    }
    static async deleteTask({
        projectId,
        payload: taskId,
        collaboratorId
    }: WSProjectTaskToBeDeletedForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.DeleteProjectTask,
            [
                projectId,
                collaboratorId,
                taskId
            ]
        );
        return record;
    }
    static async commentInTask({
        projectId,
        payload: comment,
        collaboratorId
    }: WSProjectTaskCommentForm): Promise<any> {
        const [[record]] = await DBConnection.query(
            StoredProcedures.CommentInProjectTask,
            [
                projectId,
                collaboratorId,
                comment.taskId,
                comment.content
            ]
        );
        return record;
    }
}