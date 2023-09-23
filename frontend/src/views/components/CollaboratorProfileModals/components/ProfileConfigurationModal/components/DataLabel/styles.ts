import { MOBILE_WIDTH } from "src/config/constants";
import styled from "styled-components";

export const UserDataSubtitle = styled.label`
    color: var(--cream-1);
    font-size: 14px;
    font-weight: 700;
    @media (max-width: ${MOBILE_WIDTH}px) {
        font-size: 12px;
    }
`;
export const UserData = styled.span`
    font-size: 18px;
    color: var(--white-1);
    width: 100%;
    max-width: 245px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    @media (max-width: ${MOBILE_WIDTH}px) {
        font-size: 13px;
    }
`;