import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

const StickyBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${variables.spacing.xl}px;
  margin-top: -${variables.spacing.lg}px;
  margin-bottom: ${variables.spacing.xl}px;

  > * {
    z-index: 1;
    margin: 0 ${variables.spacing.md}px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - var(--scroll-bar));
    height: 100%;
    margin-left: -${variables.gutters.page}px;
    background-color: ${variables.colors.secondaryDark};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: calc(${variables.sizes.zigzag}px / 2 * -1);
    width: calc(100vw - var(--scroll-bar));
    height: 20px;
    margin-left: -${variables.gutters.page}px;
    background: linear-gradient(
        -45deg,
        transparent ${variables.sizes.zigzag}px,
        ${variables.colors.secondaryDark} 0
      ),
      linear-gradient(
        45deg,
        transparent ${variables.sizes.zigzag}px,
        ${variables.colors.secondaryDark} 0
      );
    background-repeat: repeat-x;
    background-position: left top;
    background-size: ${variables.sizes.zigzag}px ${variables.sizes.zigzag}px;
  }
`;

export default StickyBar;
