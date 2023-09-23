import { Icon } from "@iconify/react/dist/iconify.js";
import {
    CloseIconContainer,
    Container,
    IconContainer,
    TextModal,
    TitleModal,
} from "./styles";
import { NotificationCardProps } from "./types";
import {useEffect, useState} from "react";
import {DELTA_SECONDS } from "./utils/constants";
import { FlexFlow } from "../styles";

const NotificationCard = ({
    handler: { timeoutToClose, visible, hide },
    appearanceProps,
}: NotificationCardProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(timeoutToClose);
    const [progress, setProgress] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
    //#region Effects
    const initChronometer = () => {
        if (!visible) {
            clearInterval(intervalId);
            return;
        }
        let newIntervalId: NodeJS.Timeout | undefined;
        setTimeLeft(timeoutToClose);
        setTimeout(() => {
            newIntervalId = setInterval(() => {
                setTimeLeft(currentTimeLeft => {
                    // Eliminando interval al término del tiempo determinado
                    if (currentTimeLeft <= 0) {
                        clearInterval(newIntervalId);
                        return 0;
                    }
                    return currentTimeLeft - DELTA_SECONDS;
                });
            }, DELTA_SECONDS * 1000);
            setIntervalId(newIntervalId);
        }, 100);
    };
    useEffect(initChronometer, [visible]);
    useEffect(() => {
        fillProgress();
    }, [timeLeft]);
    //#endregion
    //#region Functions
    const fillProgress = () => {
        setProgress((timeLeft / timeoutToClose) * 100);
    };
    const getClassName = (): string => {
        const classList: string[] = [];
        visible && classList.push("visible");
        return classList.join(" ");
    };
    //#endregion
    return (
        //GNOMO CAMBIAR NOMBRE DE VARIANT
        <Container
            className={getClassName()}
            color={appearanceProps.color}
            progress={progress}>
            <CloseIconContainer onClick={() => hide()}>
                <Icon icon="mdi:close" />
            </CloseIconContainer>
            <FlexFlow align="center" gap="10px">
                <IconContainer color={appearanceProps.color} >
                    <Icon icon="material-symbols:check-circle-outline" />
                </IconContainer>
                <TitleModal color={appearanceProps.color}>{appearanceProps.title}</TitleModal>
            </FlexFlow>
            <TextModal>{appearanceProps.subtitle}</TextModal>
        </Container>
    );
};

export default NotificationCard;
