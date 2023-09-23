import { ProjectSubmoduleView } from "src/config/types";
import ProjectDetailsView from "../components/ProjectDetailsView/ProjectDetailsView";
import ProjectPanel from "../components/ProjectPanel/ProjectPanel";

export const SUBMODULES_VIEWS: ProjectSubmoduleView[] = [
    {
        key: "PROJECT_DETAILS",
        View: ProjectDetailsView,
        path: "detalles",
    },
    {
        key: "PROJECT_PANEL",
        View: ProjectPanel,
        path: "*"
    },
];
