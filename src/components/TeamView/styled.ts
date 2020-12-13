import styled from 'styled-components/macro';
import { baseTransition, spaceUpOut } from '~/lib/animations';
import { media } from '~/lib/media';

type TabItemProps = {
  'aria-selected': boolean;
};

type TabContentProps = {
  'aria-hidden': boolean;
};

export const AddButton = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--spacing-xxl);
  color: var(--color-white);
  font-size: var(--font-size-xxl);
  font-weight: 700;
  line-height: 0;
  background: linear-gradient(
    to bottom,
    var(--color-primary-dark) 0%,
    var(--color-primary-dark) 41%,
    var(--color-gray-darker) 41%,
    var(--color-gray-darker) 59%,
    var(--color-white) 59%,
    var(--color-white) 100%
  );
  [aria-selected='true'] > & {
    background: linear-gradient(
      to bottom,
      var(--color-primary) 0%,
      var(--color-primary) 41%,
      var(--color-gray-darker) 41%,
      var(--color-gray-darker) 59%,
      var(--color-white) 59%,
      var(--color-white) 100%
    );
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
    display: block;
    width: 1em;
    height: 1em;
    background-color: var(--color-gray-darker);
    border-radius: 50%;
  }
`;

export const TabBar = styled.div`
  margin-top: calc(var(--spacing-xs) * -1);
  [data-react-beautiful-dnd-droppable] {
    overflow-x: auto;
  }
`;

export const TabScroller = styled.div`
  display: inline-flex;
  min-width: 100%;
  padding-top: calc(var(--spacing-md) + var(--spacing-sm));
  > * {
    flex: 1 0 auto;
    min-width: 250px;
  }
`;

export const TabItem = styled.div`
  color: ${(props: TabItemProps): string =>
    props['aria-selected'] ? 'initial' : 'var(--color-white)'};
  background-color: ${(props: TabItemProps): string =>
    props['aria-selected'] ? 'var(--color-white)' : 'var(--color-gray-dark)'};
  cursor: pointer;
  &[data-add-button] {
    background-color: var(--color-white);
  }
  > * {
    ${baseTransition}
    background-color: inherit;
    height: calc(var(--spacing-xxl) + var(--spacing-lg));
    transition-property: transform;
    will-change: transform;
  }
  &:hover,
  &:focus {
    > * {
      transform: translateY(calc(var(--spacing-md) * -1));
    }
  }
`;

export const TabContent = styled.div<TabContentProps>`
  padding: var(--spacing-lg) var(--gutter-page);
  background-color: var(--color-gray);
  grid-gap: var(--gutter-grid);
  ${props =>
    props['aria-hidden'] ? 'display: none !important;' : 'display: grid;'}

  ${media.medium`
    padding-left: var(--gutter-page-md);
    padding-right: var(--gutter-page-md);
  `}

  ${media.mediumLarge`
    grid-template-columns: 1fr 1fr;
  `}
`;

export const Bin = styled.div`
  --background: var(--color-primary);
  --color: #ffffff75;
  ${baseTransition}
  opacity: 0;
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 1;
  height: 144px;
  color: var(--color);
  background: var(--background);
  transform: translateX(-50%);
  transition-property: opacity;
  pointer-events: none;

  &[data-react-beautiful-dnd-droppable] {
    overflow: visible;
  }

  .is-dragging & {
    opacity: 1;
  }

  [data-binned-item] {
    animation: ${spaceUpOut} 0.75s linear;
    animation-fill-mode: forwards;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
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
      content: '';
      position: absolute;
      top: 64px;
      left: calc(-64px - 16.5px);
      width: 144px;
      height: calc(var(--zig-zag) / 2);
      transform: rotate(-90deg);
      background: linear-gradient(
          -45deg,
          var(--background) var(--zig-zag),
          transparent 0
        ),
        linear-gradient(45deg, var(--background) var(--zig-zag), transparent 0);
      background-repeat: repeat-x;
      background-position: left top;
      background-size: var(--zig-zag) 46px;
    }

    &::after {
      left: calc(100% - 64px);
      transform: rotate(90deg);
    }
  }
`;
