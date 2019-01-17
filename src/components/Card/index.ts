import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { zoomIn } from "../../helpers/animations";
import { getTypeGradient } from "../../helpers/gradients";
import * as variables from "../../helpers/variables";
import { Type } from "../../types";

interface ICardHeaderProps {
  types: Type[];
  isSquared?: boolean;
}

export const CardLink = styled(Link)`
  ${zoomIn}
  color: initial;
  text-decoration: none;
`;

export const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CardHeader = styled.header`
  overflow: hidden;
  margin-bottom: -${variables.spacing.lg * 1.5}px;
  padding: 0 ${variables.spacing.md}px ${variables.spacing.lg}px;
  color: ${variables.colors.white};
  text-shadow: 0 1px 0px ${variables.colors.grayDarker},
    1px 0 0px ${variables.colors.grayDark},
    1px 2px 0px ${variables.colors.grayDarker},
    2px 1px 0px ${variables.colors.grayDark},
    2px 3px 0px ${variables.colors.grayDarker},
    3px 2px 0px ${variables.colors.grayDark};
  background-image: ${({ types }: ICardHeaderProps) => getTypeGradient(types)};
  border-radius: ${({ isSquared }: ICardHeaderProps) =>
    isSquared ? "0" : `${variables.sizes.borderRadius}px 0 0 0`};
`;

export const CardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  margin: ${variables.spacing.md}px ${variables.spacing.sm}px 0;
  padding: 0 ${variables.spacing.sm}px;
  background-color: ${variables.colors.white};
  border-radius: 0 0 ${variables.sizes.borderRadius}px 0;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: calc(${variables.sizes.zigzag}px / 2 * -1);
    width: 100%;
    height: calc(${variables.sizes.zigzag}px / 2);
    background: linear-gradient(
        -45deg,
        ${variables.colors.white} ${variables.sizes.zigzag}px,
        transparent 0
      ),
      linear-gradient(
        45deg,
        ${variables.colors.white} ${variables.sizes.zigzag}px,
        transparent 0
      );
    background-repeat: repeat-x;
    background-position: left top;
    background-size: ${variables.sizes.zigzag}px 46px;
  }
`;
