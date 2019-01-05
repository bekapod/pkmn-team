import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface IProps {
  stackVertically?: boolean;
}

const CenteredRow = styled.div`
  display: flex;
  flex-direction: ${({ stackVertically }: IProps) =>
    stackVertically ? "column" : "row"};
  justify-content: ${({ stackVertically }: IProps) =>
    stackVertically ? "flex-start" : "center"};
  align-items: ${({ stackVertically }: IProps) =>
    stackVertically ? "center" : "flex-start"};
  margin-bottom: ${variables.spacing.lg}px;

  & > * {
    margin-right: ${({ stackVertically }: IProps) =>
      stackVertically ? 0 : `${variables.gutters.grid}px`};

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default CenteredRow;
