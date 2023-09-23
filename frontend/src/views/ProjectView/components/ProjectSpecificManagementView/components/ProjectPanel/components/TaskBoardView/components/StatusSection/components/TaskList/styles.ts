import { FlexFlow } from 'src/components/styles';
import styled from 'styled-components';

export const Container = styled(FlexFlow.withComponent("ul"))`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 60vh;
    padding: 0 20px;
    overflow-y: scroll;
`;