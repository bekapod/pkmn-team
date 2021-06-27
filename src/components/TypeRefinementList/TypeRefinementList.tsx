import type { FunctionComponent, MouseEvent } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import type {
  ConnectorProvided,
  RefinementListProvided
} from 'react-instantsearch-core';
import { TypeTag } from '../TypeTag';

export const TypeRefinementList: FunctionComponent<
  ConnectorProvided<RefinementListProvided>
> = ({ items, refine }) => (
  <ul className="flex flex-wrap pl-3 pr-1 pt-3 pb-1 bg-white">
    {items.map(item => (
      <li key={item.label} className="mr-2 mb-2">
        <TypeTag
          as="button"
          typeSlug={item.label.toLowerCase()}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {item.label} ({item.count})
        </TypeTag>
      </li>
    ))}
  </ul>
);

// 2. Connect the component using the connector
export const ConnectedTypeRefinementList =
  connectRefinementList(TypeRefinementList);
