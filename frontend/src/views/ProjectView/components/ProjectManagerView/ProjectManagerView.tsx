import { useEffect, useState } from "react";
import { Container, Content, ProjectFinderWrapper } from "./styles";
import useModal from "src/components/Modal/utils/hooks/useModal";
import RecentProjects from "./components/RecentProjects/RecentProjects";
import UpdateProjectModal from "./components/UpdateProjectModal/UpdateProjectModal";
import AllProjects from "./components/AllProjects/AllProjects";
import NotificationCard from "src/components/NotificationCard/NotificationCard";
import useNotificationCard from "src/components/NotificationCard/utils/hooks/useNotificationCard";
import { Project } from "src/entities/project/entities";
import useFormProject from "./utils/hooks/useFormProject";
import DeleteProjectModal from "./components/DeleteProjectModal/DeleteProjectModal";
import ProjectFinder from "./components/ProjectFinder/ProjectFinder";
import useProjectList from "./utils/hooks/useProjectList";
import useProjectFilters from "./utils/hooks/useProjectFilters";
import usePreloader from "src/components/Preloader/utils/hooks/usePreloader";
import Preloader from "src/components/Preloader/Preloader";
import EmptyProjects from "./components/EmptyProjects/EmptyProjects";
import { DBRoles } from "src/config/roles";
import { MenuOption } from "src/views/components/MenuOptions/types";
import useUserRole from "src/storage/hooks/useUserRole";
import { requestDeleteProject } from "src/services/projects/relatedToProjects";
import useMasterRouterContext from "src/routes/utils/context/useMasterRouterContext";
import NewProjectModal from "./components/NewProjectModal/NewProjectModal";
import { DELETE_PROJECT_APPEARANCE } from "./utils/constants";

const ProjectManagerView = () => {
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    //#region Modals
    const notificationCard = useNotificationCard();
    const newProjectModal = useModal();
    const updateProjectModal = useModal();
    const deleteProjectModal = useModal();
    const preloader = usePreloader();
    const userRole = useUserRole();
    const isGeneralAdmin: boolean = userRole === DBRoles.GeneralAdmin;
    //#endregion
    const { form, getProjectFromForm } = useFormProject(
        newProjectModal,
        updateProjectModal,
        currentProject
    );
    const filters = useProjectFilters();
    const { recentProjects, allProjects, fillProjects, doFill } =
        useProjectList(preloader, filters.value);
    const { mainMenuButtonHandler } = useMasterRouterContext();
    useEffect(() => {
        addMenuButtons();
        return removeMenuButtons;
    }, [userRole]);
    const addMenuButtons = (): void => {
        if (!isGeneralAdmin) return;
        addGeneralAdminMenuButtons();
    };
    const removeMenuButtons = (): void => {
        if (!isGeneralAdmin) return;
        removeGeneralAdminMenuButtons();
    };
    const addGeneralAdminMenuButtons = (): void => {
        mainMenuButtonHandler.addButton(
            {
                id: "ADD_PROJECT",
                icon: "mdi:layers-plus",
                onClick: openCreateProjectModal,
            },
            1
        );
    };
    const removeGeneralAdminMenuButtons = (): void => {
        mainMenuButtonHandler.removeButton("ADD_PROJECT");
    };
    const openCreateProjectModal = (): void => {
        notificationCard.hide();
        setCurrentProject(null);
        newProjectModal.open(true);
    };
    const openUpdateProjectModal = (project: Project): void => {
        notificationCard.hide();
        setCurrentProject(project);
        updateProjectModal.open(true);
    };
    const openDeleteProjectModal = (project: Project): void => {
        notificationCard.hide();
        setCurrentProject(project);
        deleteProjectModal.open(true);
    };
    const getMenuOptions = (project: Project): MenuOption[] => {
        if (!userRole) return [];
        const menuOptionsByUserRole: Record<DBRoles, MenuOption[]> = {
            [DBRoles.GeneralAdmin]: [
                {
                    text: "Editar",
                    onClick: () => openUpdateProjectModal(project),
                    icon: "mingcute:edit-2-fill",
                },
                {
                    text: "Eliminar",
                    onClick: () => openDeleteProjectModal(project),
                    color: "--red-2",
                    icon: "ic:baseline-delete",
                },
            ],
            [DBRoles.Collaborator]: [
                {
                    text: "Detalles",
                    to: `${project.id}/detalles`,
                    icon: "fa6-solid:diagram-project",
                },
            ],
        };
        return menuOptionsByUserRole[userRole] || [];
    };
    const deleteProject = async (): Promise<void> => {
        if (!currentProject?.id) return;
        deleteProjectModal.open(false);
        preloader.show("Eliminando proyecto...");
        const { message } = await requestDeleteProject(currentProject.id);
        preloader.hide();
        if (message !== "SUCCESS") return;
        fillProjects();
        notificationCard.changeAppearance(DELETE_PROJECT_APPEARANCE);
        notificationCard.show();
    };
    return (
        <>
            <Container>
                <Content>
                    <ProjectFinderWrapper>
                        <ProjectFinder
                            filters={filters}
                            doFillProjects={doFill}
                        />
                    </ProjectFinderWrapper>
                    {recentProjects.length > 0 ? (
                        <>
                            <RecentProjects
                                recentProjects={recentProjects}
                                getMenuOptions={getMenuOptions}
                            />
                            <AllProjects
                                allProjects={allProjects}
                                getMenuOptions={getMenuOptions}
                            />
                        </>
                    ) : (
                        <EmptyProjects />
                    )}
                </Content>
            </Container>
            {isGeneralAdmin && (
                <>
                    <NewProjectModal
                        preloader={preloader}
                        modalProps={newProjectModal}
                        form={form}
                        getProjectFromForm={getProjectFromForm}
                        fillProjects={fillProjects}
                        notificationCard={notificationCard}
                    />
                    <UpdateProjectModal
                        modalProps={updateProjectModal}
                        currentProject={currentProject}
                        form={form}
                        getProjectFromForm={getProjectFromForm}
                        fillProjects={fillProjects}
                        preloader={preloader}
                        notificationCard={notificationCard}
                    />
                    <DeleteProjectModal
                        modalProps={deleteProjectModal}
                        deleteProject={deleteProject}
                    />
                    <NotificationCard
                        handler={notificationCard}
                        appearanceProps={notificationCard.cardAppearanceProps}
                    />
                </>
            )}
            <Preloader {...preloader.value} />
        </>
    );
};

export default ProjectManagerView;
