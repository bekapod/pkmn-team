import { keyframes } from 'styled-components';

export const pulseFade = keyframes`
  from {
    opacity: 0.5;
    transform: scale3d(1, 1, 1);
  }
  50% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }
  to {
    opacity: 0.5;
    transform: scale3d(1, 1, 1);
  }
`;

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const spaceUpOut = keyframes`
  from {
    opacity: 1;
    transform-origin: 50% 0;
    transform: scale(1) translate(0%, 0%);
  }
  to {
    opacity: 0;
    transform-origin: 50% 0;
    transform: scale(.2) translate(0%, -200%);
  }
`;
