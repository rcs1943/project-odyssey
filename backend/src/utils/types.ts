import { ResponseCodes } from "./response/enums";

export type TokenPayload = {
    username: string,
    roleId: string
};
export type ResponseBody<T = null> = {
    code: ResponseCodes,
    message: string | null,
    data: T
};
export type PaginableList<O> = {
    list: O[];
    count: number;
};