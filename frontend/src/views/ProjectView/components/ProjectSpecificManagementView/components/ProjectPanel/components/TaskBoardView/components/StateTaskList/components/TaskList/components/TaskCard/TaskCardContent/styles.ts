import styled from 'styled-components';
import { ContainerProps } from '../types';
import { MOBILE_WIDTH } from 'src/config/constants';
import { TASK_CARD_CONTENT_GAP, TASK_CARD_CONTENT_MOBILE_GAP } from '../utils/constants';

export const Check = styled.span`
    display: flex;
    cursor: pointer;
    transition: 0.35s;
    align-self: flex-start;
    & .iconify {
        border-radius: 50%;
        color: var(--white-1);
        font-size: 24px;
        transition: 0.35s;
    }
`;
export const Container = styled.li<ContainerProps>`
    display: flex;
    flex-direction: column;
    gap: ${TASK_CARD_CONTENT_GAP};
    padding: 18px;
    border: 1px solid var(--gray-3);
    border-radius: 10px;
    width: 100%;
    transition: 
        0.35s border-color, 
        0.35s background-color, 
        0.35s scale, 
        0.35s opacity;
    user-select: none;
    cursor: pointer;
    &.open, &.dragging {
        background-color: var(--darkblue-7);
        border: 2px solid var(--gray-1);
    }
    &.dragging {
        position: fixed;
        width: ${({ width = 0 }) => width}px;
        z-index: 1;
        &:active {
            cursor: url("/custom-cursor.png"), move;
        }
    }
    &:not(.finalized) {
        & ${Check} {
            &:not(:hover) {
                & .iconify.checked {
                    opacity: 0;
                    position: absolute;
                    visibility: hidden;
                }
            }
            &:hover {
                & .iconify.unchecked {
                    opacity: 0;
                    position: absolute;
                    visibility: hidden;
                }
                transform: scale(1.2) rotate(360deg);
            }
        }
        &.cannot-editing ${Check} {
            & .iconify.checked {
                opacity: 0;
                position: absolute;
                visibility: hidden;
            }
            & .iconify.unchecked {
                opacity: 1;
                position: static;
                visibility: visible;
            }
            transform: unset;
        }
    }
    &.finalized {
        &:not(.dragging) {
            opacity: 0.4;
        }
        & .iconify.unchecked {
            opacity: 0;
            position: absolute;
            visibility: hidden;
        }
    }
    :hover {
        border-color: var(--white-1);
    }
    :active {
        scale: 1.01;
    }
    @media (max-width: ${MOBILE_WIDTH}px) {
        gap: ${TASK_CARD_CONTENT_MOBILE_GAP};
    }
`;

export const LockedIcon = styled.span`
    display: flex;
    .iconify {
        color: var(--white-1);
        font-size: 25px;
    }
`;