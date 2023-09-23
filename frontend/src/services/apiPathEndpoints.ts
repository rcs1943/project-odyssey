export enum ApiPathEndpoints {
    Login = "/authentication/login",
    CheckCredentials = "/authentication/check-credentials",
    CreateProject = "/general-admin/projects/create",
    DeleteProject = "/general-admin/projects/delete",
    GetProjectListByGeneralAdmin = "/general-admin/projects/all",
    UpdateProject = "/general-admin/projects/update",
    SearchCollaborator = "/general-admin/collaborators/search",
    GetCollaborators = "/general-admin/collaborators",
    CreateCollaborator = "/general-admin/collaborators/create",
    UpdateCollaborator = "/general-admin/collaborators/update",
    DeleteCollaborator = "/general-admin/collaborators/delete",
    GetProjectListForCollaborator = "/collaborator/projects/all",
    GetProjectDetails = "/collaborator/projects/details",
    UpdateEndDateProject = "/collaborator/projects/update-end-date",
    SearchCollaboratorMember = "/collaborator/projects/search-collaborator-member",
    AddProjectMembers = "/collaborator/projects/add-members",
    DeleteProjectMember = "/collaborator/projects/delete-member",
    GetProjectDetailsForPanel = "/collaborator/project-panel/details",
    SearchProjectTeamMembers = "/collaborator/project-tasks/team-members",
    SearchTaskPriorities = "/collaborator/project-tasks/priorities",
    UpdatePhoto = "/collaborator/profile/update-photo",
    ChangePassword = "/collaborator/profile/change-password",
}