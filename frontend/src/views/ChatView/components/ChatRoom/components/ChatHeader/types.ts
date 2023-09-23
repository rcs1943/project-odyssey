import { ReactNode } from "react";

export type ChatHeaderProps = {
    portrait: ReactNode;
    title: string;
    subtitle: ReactNode;
    closeChat: () => void;
};
