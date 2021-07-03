import '@testing-library/jest-dom';
import * as nextImage from 'next/image';

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}));

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  // eslint-disable-next-line
  value: (props: any) => <img {...props} />
});

process.env.NEXT_PUBLIC_ALGOLIA_POKEMON_INDEX = 'pokemon';
process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID = 'app-id';
process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY = 'search-key';
