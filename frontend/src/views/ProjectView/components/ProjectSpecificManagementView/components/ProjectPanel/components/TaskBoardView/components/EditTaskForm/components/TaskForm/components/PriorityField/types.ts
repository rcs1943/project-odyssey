import { TaskForm } from "../../../../utils/hooks/types"
import { FieldProps } from "../../types";

export type PriorityFieldProps = FieldProps & {
    form: TaskForm;
};