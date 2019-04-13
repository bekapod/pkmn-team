import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface Props {
  stackVertically?: boolean;
}

const CenteredRow = styled.div`
  display: flex;
  flex-direction: ${({ stackVertically }: Props): string =>
    stackVertically ? "column" : "row"};
  justify-content: ${({ stackVertically }: Props): string =>
    stackVertically ? "flex-start" : "center"};
  align-items: ${({ stackVertically }: Props): string =>
    stackVertically ? "center" : "flex-start"};
  margin-bottom: ${variables.spacing.lg}px;

  & > * {
    margin-right: ${({ stackVertically }: Props): number | string =>
      stackVertically ? 0 : `${variables.gutters.grid}px`};
    margin-bottom: ${({ stackVertically }: Props): number | string =>
      stackVertically ? `${variables.spacing.md}px` : 0};

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default CenteredRow;
