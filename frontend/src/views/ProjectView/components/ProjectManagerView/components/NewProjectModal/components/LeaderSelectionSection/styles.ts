import styled from "styled-components";
import { FlexFlow } from "src/components/styles";
import { MOBILE_WIDTH } from "src/config/constants";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 85px 0 70px;
`;
export const Column = styled(FlexFlow)`
    @media (max-width: ${MOBILE_WIDTH}px) {
        width: 100%;
    }
`;
