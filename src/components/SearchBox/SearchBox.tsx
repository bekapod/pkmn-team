import { connectSearchBox } from 'react-instantsearch-dom';
import type {
  ConnectorProvided,
  SearchBoxProvided
} from 'react-instantsearch-core';
import type { FunctionComponent } from 'react';
import { GiantInput, GiantInputProps } from '../GiantInput';

export const SearchBox: FunctionComponent<
  Partial<ConnectorProvided<SearchBoxProvided>> &
    GiantInputProps & { indexContextValue?: unknown }
> = ({
  currentRefinement,
  isSearchStalled,
  indexContextValue,
  refine,
  createURL,
  ...props
}) => (
  <form noValidate action="" role="search" className="z-1">
    <GiantInput
      type="search"
      value={currentRefinement}
      onChange={event => refine?.(event.currentTarget.value)}
      {...props}
    />
  </form>
);

export const ConnectedSearchBox = connectSearchBox(SearchBox);
