import { User } from "src/entities/user/types";
import { CollaboratorFilters } from "../../types";

export type CollaboratorsHook = {
    value: User[];
    fill: () => Promise<void>;
    doFill: () => void;
};
export type CollaboratorFiltersHook = {
    value: CollaboratorFilters;
    change: (filter: string, value: string) => void;
};
export type CurrentCollaboratorHook = {
    value: User | null;
    fill: (newCurrentCollaborator: User) => void;
    clear: () => void;
};
