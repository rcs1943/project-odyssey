import WSServicePaths from "./services";

export type WSHeaders = {
    [header: string]: string
};
export type WSUserData = {
    userId: number;
};
export type WSServiceDataConnection<P> = {
    servicePath: WSServicePaths;
    getHeaders: (params: P) => WSHeaders;
};