import { Socket } from "socket.io";
import { WSUserDataProjectTaskService } from "./entities";
import { isPositiveNumberNonZero } from "../../../../utils/numbers";
import { getWSUserData } from "../../../utils/helpers";
import WSErrorMessages from "../../../utils/errorMessages";

export const getUserDataProjectTaskServiceBySocket = (socket: Socket): WSUserDataProjectTaskService => {
    const { headers } = socket.handshake;
    const { userId } = getWSUserData(socket);
    const projectId: any = Number(headers["x-project-id"]);
    if (!isPositiveNumberNonZero(projectId)) 
        throw Error(WSErrorMessages.InvalidConnectionData);
    return { userId, projectId };
}
export abstract class WSProjectTaskServiceRoomHandler {
    public static getProjectRoom(projectId: number) {
        return `project:${projectId}`;
    }
};