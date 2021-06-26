import React from 'react';
import { setupWorker, rest } from 'msw';
import { makeDecorator } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import Router from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { charmander, haunter, pikachu } from '../src/mocks/Pokemon';
import '../src/styles/globals.css';

const worker = setupWorker(
  rest.post(/.*algolia.*/, (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            exhaustiveFacetsCount: true,
            exhaustiveNbHits: true,
            facets: {
              'types.type.name': {
                Water: 131,
                Normal: 109,
                Flying: 98,
                Grass: 97,
                Psychic: 82,
                Bug: 77,
                Poison: 66,
                Fire: 64,
                Ground: 64,
                Rock: 60,
                Fighting: 54,
                Steel: 49,
                Electric: 48,
                Fairy: 47,
                Dark: 46,
                Dragon: 45,
                Ghost: 43,
                Ice: 34
              }
            },
            hits: [
              { ...charmander, objectID: '1' },
              { ...haunter, objectID: '2' },
              { ...pikachu, objectID: '3' }
            ],
            hitsPerPage: 50,
            index: 'pokemon',
            nbHits: 3,
            nbPages: 1,
            page: 0
          }
        ]
      })
    )
  )
);

worker.start({
  onUnhandledRequest: 'warn'
});

const withNextRouter = makeDecorator({
  name: 'withNextRouter',
  parameterName: 'router',
  wrapper: (Story, context) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Router.router = {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push(url, as, options) {
        action('nextRouter.push')(url, as, options);
        return Promise.resolve(true);
      },
      replace(url, as, options) {
        action('nextRouter.replace')(url, as, options);
        return Promise.resolve(true);
      },
      reload() {
        action('nextRouter.reload')();
      },
      back() {
        action('nextRouter.back')();
      },
      prefetch(url, asPath, options) {
        action('nextRouter.prefetch')(url, asPath, options);
        return Promise.resolve();
      },
      beforePopState(cb) {
        action('nextRouter.beforePopState')(cb);
      },
      events: {
        on(type, handler) {
          action('nextRouter.events.on')(type, handler);
        },
        off(type, handler) {
          action('nextRouter.events.off')(type, handler);
        },
        emit(type) {
          action('nextRouter.events.emit')(type);
        }
      },
      isFallback: false
    };

    return (
      <RouterContext.Provider value={Router.router}>
        <Story {...context} />
      </RouterContext.Provider>
    );
  }
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    grid: { cellSize: 12 }
  }
};

export const decorators = [withNextRouter];
