import { MOBILE_WIDTH } from 'src/config/constants';
import styled from 'styled-components';

export const Container = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    row-gap: 30px;
    column-gap: 15px;
    padding: 0;
    max-width: 100%;
    margin: 0;
    @media (max-width: ${MOBILE_WIDTH}px) {
        max-height: 310px;
    }
`;