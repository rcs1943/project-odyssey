import { useEffect, useState, useRef } from "react";
import { CardTypeVisual, NotificationCardHook } from "../../types";
import { DEFAULT_NOTIFICATION_CARD, DEFAULT_TIMEOUT_SECONDS_TO_CLOSE_NOTIFICATION_CARD } from "../constants";

export const useNotificationCard = (
    initialValue?: boolean,
    timeoutToClose?: number,
): NotificationCardHook => {
    //#region States
    const [visible, setVisible] = useState<boolean>(initialValue || false);
    const [timeoutToCloseId, setTimeoutToCloseId] = useState<number>();
    const [cardAppearanceProps, setCardAppearanceProps] = useState<CardTypeVisual>(DEFAULT_NOTIFICATION_CARD);
    //#endregion
    //#region Ref
    const timeoutToCloseRef = useRef<number>(timeoutToClose || DEFAULT_TIMEOUT_SECONDS_TO_CLOSE_NOTIFICATION_CARD);
    //#endregion
    //#region Effects
    useEffect(() => {
        if (!visible) return;
        runTimeout();
    }, []);
    //#endregion
    //#region Functions
    const hide = (): void => {
        setVisible(false);
        clearTimeout(timeoutToCloseId);
    }
    const show = (): void => {
        setVisible(true);
        runTimeout();
    }
    const changeAppearance = (appearanceProps: CardTypeVisual): void => setCardAppearanceProps(appearanceProps)
    function runTimeout(): void {
        const timeoutToCloseId: number = window.setTimeout(hide, timeoutToCloseRef.current * 1000);
        setTimeoutToCloseId(timeoutToCloseId);
    }
    //#endregion
    return {
        visible, hide, show, cardAppearanceProps,
        timeoutToClose: timeoutToCloseRef.current,
        changeAppearance
    };
}

export default useNotificationCard;