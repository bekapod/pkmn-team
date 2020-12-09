import styled from 'styled-components/macro';
import { media } from '~/lib/media';

export const StickyBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--spacing-xl);
  margin-top: calc(var(--spacing-lg) * -1);
  margin-bottom: var(--spacing-xl);
  > * {
    z-index: 1;
    margin: 0 var(--spacing-md);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    margin-left: calc(var(--gutter-page) * -1);
    background-color: var(--color-secondary-dark);

    ${media.medium`
      margin-left: calc(var(--gutter-page-md) * -1);
    `}
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: calc(var(--zig-zag) / 2 * -1);
    width: 100vw;
    height: 20px;
    margin-left: calc(var(--gutter-page) * -1);
    background: linear-gradient(
        -45deg,
        transparent var(--zig-zag),
        var(--color-secondary-dark) 0
      ),
      linear-gradient(
        45deg,
        transparent var(--zig-zag),
        var(--color-secondary-dark) 0
      );
    background-repeat: repeat-x;
    background-position: left top;
    background-size: var(--zig-zag) var(--zig-zag);

    ${media.medium`
      margin-left: calc(var(--gutter-page-md) * -1);
    `}
  }
`;
