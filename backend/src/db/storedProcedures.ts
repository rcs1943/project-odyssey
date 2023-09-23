export enum StoredProcedures {
    // Login
    GetUserPasswordByUsername = "CALL sp_get_userpassword_by_username(?);",
    GetBasicUserInformation = "CALL sp_get_basic_user_information(?);",
    // Proyectos
    GetProjectListForGeneralAdmin = "CALL sp_get_project_list_for_general_admin(?);",
    GetProjectListForCollaborator = "CALL sp_get_project_list_for_collaborator(?, ?);",
    GetProjectIdsByCollaborator = "CALL sp_get_project_ids_by_collaborator_id(?);",
    CreateProject = "CALL sp_create_project(?, ?, ?, ?, ?, ?);",
    UpdateProject = "CALL sp_update_project_by_project_id(?, ?, ?, ?, ?, ?);",
    DeleteProject = "CALL sp_delete_project_by_id_project(?, ?);",
    UpdateEndDateProjectByLeader = "CALL sp_update_end_date_leader(?, ?);",
    SearchCollaboratorForProjectTeamMember = "CALL sp_search_collaborator_member(?, ?);",
    AddProjectMembers = "CALL sp_add_project_members(?, ?);",
    DeleteProjectMember = "CALL sp_delete_project_member(?, ?);",
    GetProjectDetails = "CALL sp_get_project_details_by_project_id(?);",
    GetProjectPanelDetails = "CALL sp_get_project_panel_details(?, ?);",
    // Tareas
    GetProjectTaskPriorities = "CALL sp_get_task_priorities();",
    SearchProjectTeamMember = "CALL sp_search_project_team_member(?, ?);",
    GetProjectTaskBoard = "CALL sp_get_project_task_board(?, ?);",
    CreateProjectTask = "CALL sp_create_task(?, ?, ?, ?);",
    UpdateProjectTaskMainInformation = "CALL sp_update_task_main_info(?, ?, ?, ?, ?, ?, ?, ?);",
    ChangeProjectTaskState = "CALL sp_change_task_state(?, ?, ?, ?);",
    CreateProjectSubtask = "CALL sp_create_subtask(?, ?, ?, ?);",
    UpdateProjectSubtask = "CALL sp_update_subtask(?, ?, ?, ?);",
    DeleteProjectSubtask = "CALL sp_delete_subtask(?, ?, ?);",
    SwitchCheckStatusSubtask = "CALL sp_switch_check_status_subtask(?, ?, ?, ?);",
    DeleteProjectTask = "CALL sp_delete_task(?, ?, ?);",
    CommentInProjectTask = "CALL sp_comment_in_task(?, ?, ?, ?);",
    // Chats
    SearchPrivateChatPreview = "CALL sp_search_private_chat_preview(?, ?);",
    GetPrivateChatPreviewWithMessages = "CALL sp_get_private_chat_preview_with_messages(?);",
    SearchProjectChatPreview = "CALL sp_search_project_chat_preview(?, ?);",
    GetPrivateChatMessages = "CALL sp_get_private_chat_messages(?, ?);",
    GetProjectChatMessages = "CALL sp_get_project_chat_messages(?);",
    GetRelationCollaboratorInPrivateChat = "CALL sp_get_collaborator_relations_in_private_chat(?, ?);",
    MarkPrivateChatMessagesAsSeen = "CALL sp_mark_private_messages_as_seen(?, ?);",
    MarkProjectChatMessagesAsSeen = "CALL sp_mark_project_messages_as_seen(?, ?);",
    SendMessageToPrivateChat = "CALL sp_send_message_to_private_chat(?, ?, ?);",
    CollaboratorHasUnreadPrivateChats = "CALL sp_collaborator_has_unread_private_chats(?);",
    CollaboratorHasUnreadProjectChats = "CALL sp_collaborator_has_unread_project_chats(?);",
    SendMessageToProjectChat = "CALL sp_send_message_to_project_chat(?, ?, ?);",
    // Configuración
    SearchCollaborator = "CALL sp_search_collaborator_by_collaborator_name(?);",
    GetCollaboratorList = "CALL sp_get_collaborator_list(?, ?, @collaborators_count); SELECT @collaborators_count as 'collaborators_count';",
    CreateCollaborator = "CALL sp_create_collaborator(?, ?, ?, ?, ?, ?);",
    UpdateCollaborator = "CALL sp_update_collaborator_by_id(?, ?, ?, ?, ?, ?, ?, ?, @url_photo_to_destroy); SELECT @url_photo_to_destroy AS 'url_photo_to_destroy';",
    DeleteCollaborator = "CALL sp_delete_collaborator_by_id(?, @url_photo_to_destroy); SELECT @url_photo_to_destroy AS 'url_photo_to_destroy';",
    UpdateCollaboratorPhoto = "CALL sp_update_collaborator_photo(?, ?, @url_photo_to_destroy); SELECT @url_photo_to_destroy AS 'url_photo_to_destroy';",
    ChangeCollaboratorPassword = "CALL sp_change_collaborator_password(?, ?);"
}