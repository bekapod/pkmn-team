import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface Props {
  stackVertically?: boolean;
}

const CenteredRow = styled.div`
  display: flex;
  flex-direction: ${({ stackVertically }: Props) =>
    stackVertically ? "column" : "row"};
  justify-content: ${({ stackVertically }: Props) =>
    stackVertically ? "flex-start" : "center"};
  align-items: ${({ stackVertically }: Props) =>
    stackVertically ? "center" : "flex-start"};
  margin-bottom: ${variables.spacing.lg}px;

  & > * {
    margin-right: ${({ stackVertically }: Props) =>
      stackVertically ? 0 : `${variables.gutters.grid}px`};
    margin-bottom: ${({ stackVertically }: Props) =>
      stackVertically ? `${variables.spacing.md}px` : 0};

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default CenteredRow;
