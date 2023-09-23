import styled, { keyframes } from "styled-components";
import { MOBILE_WIDTH } from "src/config/constants";

const bgAnimation = keyframes`
    to {
        filter: blur(220px);
    }
`;
const bgAnimationMobile = keyframes`
    to {
        filter: blur(140px);
    }
`;
export const Container = styled.section`
    display: flex;
    height: 100vh;
    padding: 0 269px 0 190px;
    gap: 100px;
    align-items: center;
    justify-content: center;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    ::before {
        position: fixed;
        top: 5vh;
        left: 5vw;
        display: block;
        content: attr(div);
        width: 30vw;
        height: 20vw;
        border-radius: 100%;
        background-color: var(--orange-3);
        filter: blur(150px);
        animation: linear ${bgAnimation} 2s infinite alternate-reverse;
        z-index: -1;
    }
    @media (max-width: ${MOBILE_WIDTH}px) {
        padding: 0;
        ::before {
            top: 0;
            left: 0;
            width: 50vw;
            height: 40vw;
            animation-name: ${bgAnimationMobile};
            filter: blur(100px);
        }
    }    
`;
export const Slogan = styled.div`
    flex: 1;
    h1 {
        font-size: 45px;
        color: #fff;
    }
    @media (max-width: ${MOBILE_WIDTH}px) {
        display: none;
    }
`;
export const Logo = styled.img`
    position: absolute;
    right: 20px;
    bottom: 20px;
    height: 50px;
`;
