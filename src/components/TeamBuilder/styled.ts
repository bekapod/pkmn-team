import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface ITabItemProps {
  "aria-selected": boolean;
}

interface ITabContentProps {
  "aria-hidden": boolean;
}

export const TabBar = styled.div`
  display: flex;

  > * {
    flex: 1;
  }
`;

export const TabItem = styled.div`
  color: ${(props: ITabItemProps) =>
    props["aria-selected"] ? "initial" : variables.colors.white};
  background-color: ${(props: ITabItemProps) =>
    props["aria-selected"]
      ? variables.colors.white
      : variables.colors.grayDark};
`;

export const TabContent = styled.div`
  ${(props: ITabContentProps) =>
    props["aria-hidden"] ? "display: none;" : "display: block;"}
`;
