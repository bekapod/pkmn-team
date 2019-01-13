import { keyframes } from "styled-components/macro";

export const radialIn = `
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
  transition-property: color;
  transition-duration: 0.5s;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    transform: scale(2);
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover::before,
  &:focus::before,
  &:active::before {
    transform: scale(0);
  }
`;

export const zoomIn = `
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;

  &:hover,
  &:focus {
    transform: scale(1.05);
  }
`;

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
