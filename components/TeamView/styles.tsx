import styled from "styled-components/macro";
import { rgba } from "polished";
import { baseTransition, spaceUpOut } from "../../helpers/animations";
import * as variables from "../../helpers/variables";

interface TabItemProps {
  "aria-selected": boolean;
}

interface TabContentProps {
  "aria-hidden": boolean;
}

export const AddButton = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${variables.spacing.xxl}px;
  color: ${variables.colors.white};
  font-size: ${variables.fontSizes.xxl}px;
  font-weight: 700;
  line-height: 0;
  background: linear-gradient(
    to bottom,
    ${variables.colors.primaryDark} 0%,
    ${variables.colors.primaryDark} 41%,
    ${variables.colors.grayDarker} 41%,
    ${variables.colors.grayDarker} 59%,
    ${variables.colors.white} 59%,
    ${variables.colors.white} 100%
  );

  [aria-selected="true"] > & {
    background: linear-gradient(
      to bottom,
      ${variables.colors.primary} 0%,
      ${variables.colors.primary} 41%,
      ${variables.colors.grayDarker} 41%,
      ${variables.colors.grayDarker} 59%,
      ${variables.colors.white} 59%,
      ${variables.colors.white} 100%
    );
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
    display: block;
    width: 1em;
    height: 1em;
    background-color: ${variables.colors.grayDarker};
    border-radius: 50%;
  }
`;

export const TabBar = styled.div`
  [data-react-beautiful-dnd-droppable] {
    display: flex;
  }

  [data-react-beautiful-dnd-draggable],
  [data-binned-item],
  [data-add-button] {
    flex: 1;
  }
`;

export const TabItem = styled.div`
  color: ${(props: TabItemProps) =>
    props["aria-selected"] ? "initial" : variables.colors.white};
  background-color: ${(props: TabItemProps) =>
    props["aria-selected"]
      ? variables.colors.white
      : variables.colors.grayDark};
  cursor: pointer;

  &[data-add-button] {
    background-color: ${variables.colors.white};
  }

  > * {
    ${baseTransition}
    background-color: inherit;
    transition-property: transform;
    will-change: transform;
  }

  &:hover,
  &:focus {
    > * {
      transform: translateY(-${variables.spacing.md}px);
    }
  }
`;

export const TabContent = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-gap: ${variables.gutters.grid}px;
  padding: ${variables.spacing.lg}px;
  background-color: ${variables.colors.gray};

  ${(props: TabContentProps) =>
    props["aria-hidden"] ? "display: none !important;" : "display: grid;"}
`;

export const Bin = styled.div`
  --background: transparent;
  --helperOpacity: 0;

  ${baseTransition}
  opacity: 0;
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 1;
  height: 99px;
  color: ${rgba(variables.colors.white, 0.5)};
  background: var(--background);
  transform: translateX(-50%);
  transition-property: all;
  pointer-events: none;

  .is-dragging & {
    opacity: 1;
  }

  &::before {
    content: "";
    width: 150vw;
    background: ${rgba(variables.colors.grayDark, 0.5)};
    position: absolute;
    top: 0;
    left: -50vw;
    height: 100%;
  }

  [data-binned-item] {
    animation: ${spaceUpOut} 0.75s linear;
    animation-fill-mode: forwards;
  }

  [data-icon] {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 70%;
    transform: translate(-50%, -50%);
  }

  .zig-zag-helper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    &::before,
    &:after {
      ${baseTransition}

      content: "";
      opacity: var(--helperOpacity);
      position: absolute;
      top: 41px;
      left: calc(-41px - 16.5px);
      width: 99px;
      height: calc(${variables.sizes.zigzag}px / 2);
      transform: rotate(-90deg);
      background: linear-gradient(
          -45deg,
          ${variables.colors.grayDark} ${variables.sizes.zigzag}px,
          transparent 0
        ),
        linear-gradient(
          45deg,
          ${variables.colors.grayDark} ${variables.sizes.zigzag}px,
          transparent 0
        );
      background-repeat: repeat-x;
      background-position: left top;
      background-size: ${variables.sizes.zigzag}px 46px;
      transition-property: opacity;
    }

    &::after {
      left: calc(100% - 41px);
      transform: rotate(90deg);
    }
  }
`;
