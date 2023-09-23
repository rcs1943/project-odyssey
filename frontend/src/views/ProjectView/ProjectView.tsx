import { ReactElement, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { currentUserLocalStorage } from "src/storage/user.local";
import ProjectManagerView from "./components/ProjectManagerView/ProjectManagerView";
import ProjectSpecificManagementView from "./components/ProjectSpecificManagementView/ProjectSpecificManagementView";
import { DBRoles } from "src/config/roles";

const ProjectView = () => {
    const [routes, setRoutes] = useState<ReactElement[] | null>(null);
    useEffect(() => {
        const currentUser = currentUserLocalStorage.get();
        fillRoutes(currentUser.role.id);
    }, []);
    const fillRoutes = (roleId: string): void => {
        const routes: ReactElement[] = [
            <Route 
                key={0} 
                path="" 
                element={<ProjectManagerView />} />,
        ];
        if (roleId === DBRoles.Collaborator) 
            routes.push(
                <Route
                    key={1}
                    path=":projectId/*"
                    element={<ProjectSpecificManagementView />}
                />
            );
        setRoutes(routes);
    };
    if (routes === null) return null;
    return <Routes>{routes}</Routes>;
};

export default ProjectView;
