import { useState, useEffect } from "react";
import CustomInputSearch from "src/components/CustomInputSearch/CustomInputSearch";
import useCustomInputSearch from "src/components/CustomInputSearch/utils/hooks/useCustomInputSearch";
import CustomInputSearchUserOption from "src/views/components/CustomInputSearchUserOption/CustomInputSearchUserOption";
import { TASK_FIELD_PROPS } from "../../../../utils/constants";
import { Container, SelfAssignmentButton } from "./styles";
import { Label } from "../../styles";
import { ResponsibleFieldProps } from "./types";
import { ProjectTaskCollaboratorUser } from "src/entities/projectTask/entities";
import SelectedResponsible from "./components/SelectedResponsible/SelectedResponsible";
import useSearchCollaborator from "src/views/ProjectView/components/ProjectManagerView/utils/hooks/useSearchCollaborator";
import useTaskBoardContext from "../../../../../../utils/contexts/useTaskBoardContext";
import { currentUserLocalStorage } from "src/storage/user.local";
import { SessionUser } from "src/entities/user/types";
import { FlexFlow } from "src/components/styles";
import { requestGetTeamMembers } from "src/services/projectTasks/aboutProjectTasks";
import { DBProjectRoles } from "src/config/roles";

const ResponsibleField = ({
    form, doUpdateTask
}: ResponsibleFieldProps) => {
    const { 
        projectId, 
        isEditTaskFormOpen, 
        preloader, 
        canEditTask,
        currentProjectTask,
        projectRoleId
    } = useTaskBoardContext();
    const currentResponsible: ProjectTaskCollaboratorUser | null = currentProjectTask?.responsible || null;
    const [selectedResponsible, setSelectedResponsible] = useState<ProjectTaskCollaboratorUser | null>(null);
    const [canChangeResponsible, setCanChangeResponsible] = useState<boolean>(false);
    useEffect(() => {
        setSelectedResponsible(isEditTaskFormOpen ? currentResponsible : null);
        setCanChangeResponsible(projectRoleId === DBProjectRoles.ProjectLeader);
    }, [isEditTaskFormOpen, currentResponsible]);
    const selectTaskResponsibleHandler = useSearchCollaborator({
        requestSearchCollaborators: async (collaboratorName: string) => {
            preloader.show("Buscando colaboradores...");
            const { data } = await requestGetTeamMembers({
                collaboratorName,
                projectId,
            });
            preloader.hide();
            return data;
        },
    });
    const changeSelectedResponsible = (
        newResponsible: ProjectTaskCollaboratorUser | null
    ): void => {
        setSelectedResponsible(newResponsible);
        form.change(
            TASK_FIELD_PROPS.TASK_RESPONSIBLE.name,
            newResponsible?.id || null
        );
        doUpdateTask();
    };
    const customSearchInputHandler = useCustomInputSearch<ProjectTaskCollaboratorUser>({
        clearOptions: selectTaskResponsibleHandler.clear,
        fillOptions: selectTaskResponsibleHandler.fill,
        onChange: changeSelectedResponsible,
    });
    const removeSelectedResponsible = (): void => {
        changeSelectedResponsible(null);
        customSearchInputHandler.clear();
    };
    const autoAssignmentResponsible = (): void => {
        const currentUser: SessionUser = currentUserLocalStorage.get();
        const newResponsible: ProjectTaskCollaboratorUser = {
            id: currentUser.id,
            name: currentUser.name,
            surname: currentUser.surname,
            urlPhoto: currentUser.urlPhoto
        }
        changeSelectedResponsible(newResponsible);
    }
    return (
        <>
        <Container align="center" width="100%">
            <Label>Responsable</Label>
            {selectedResponsible ? (
                <SelectedResponsible
                    selectedResponsible={selectedResponsible}
                    removeResponsible={removeSelectedResponsible}
                    disabled={!canEditTask || !canChangeResponsible}
                />
            ) : (
                <FlexFlow gap="10px">
                    <CustomInputSearch
                        {...TASK_FIELD_PROPS.TASK_RESPONSIBLE}
                        variant="primary-search"
                        handler={customSearchInputHandler}
                        clearOptions={selectTaskResponsibleHandler.clear}
                        fillOptions={selectTaskResponsibleHandler.fill}
                        options={selectTaskResponsibleHandler.collaboratorUserList}
                        disabled={!canEditTask}
                        getSearchedItemToShow={options => ({
                            value: options.id,
                            content: (
                                <CustomInputSearchUserOption {...options} />
                            ),
                        })}
                    />
                    {canEditTask && 
                        <SelfAssignmentButton
                            content="Asígnamela"
                            onClick={autoAssignmentResponsible}
                        />}
                </FlexFlow>
            )}
        </Container>
        </>
    );
};

export default ResponsibleField;