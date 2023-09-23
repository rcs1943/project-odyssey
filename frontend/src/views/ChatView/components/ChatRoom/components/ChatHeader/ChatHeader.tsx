import { Container, ChatTitle, CloseBtn, BackBtn } from "./styles";
import { FlexFlow } from "src/components/styles";
import { ChatHeaderProps } from "./types";
import useMainContext from "src/utils/contexts/main-context/useMainContext";

const ChatHeader = ({
    portrait,
    title,
    subtitle,
    closeChat,
}: ChatHeaderProps) => {
    const { isMobile } = useMainContext();
    return (
        <Container align="center" justify="space-between">
            {isMobile && <BackBtn onClick={closeChat} icon="ion:chevron-back"/>}
            <FlexFlow gap="18px">
                {portrait}
                <FlexFlow direction="column" gap="2px" justify="center">
                    <ChatTitle>{title}</ChatTitle>
                    {subtitle}
                </FlexFlow>
            </FlexFlow>
            {!isMobile && <CloseBtn onClick={closeChat} icon="octicon:x-16" />}
        </Container>
    );
};

export default ChatHeader;
