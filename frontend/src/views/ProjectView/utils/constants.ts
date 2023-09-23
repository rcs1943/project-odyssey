import { ProjectSubmoduleView } from "src/config/types";
import ProjectManagerView from "../components/ProjectManagerView/ProjectManagerView";
import ProjectPanel from "../components/ProjectSpecificManagementView/components/ProjectPanel/ProjectPanel";

export const SUBMODULES_VIEWS: ProjectSubmoduleView[] = [
    {
        key: "PROJECT_MANAGER",
        View: ProjectManagerView,
        path: "",
    },
    {
        key: "PROJECT_PANEL",
        View: ProjectPanel,
        path: "*",
    },
];
export enum ProjectSubmodules {
    Projects = "PROJECT_MANAGER",
    ProjectSpecificManager = "PROJECT_SPECIFIC_MANAGER"
};