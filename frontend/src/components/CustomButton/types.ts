export type CustomButtonProps = {
    className?: string;
    content?: string;
    disabled?: boolean;
    icon?: string;
    variant?: string;
    size?: string;
    width?: string;
    weight?: string;
    padding?: string;
    maxWidth?: string;
    iconAfterText?: boolean;
    iconRotate?: number;
    alignSelf?: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
};
