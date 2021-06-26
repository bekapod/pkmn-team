import { Maybe } from '~/generated/graphql';

export const extractNodesFromEdges = <T>(
  edges: Maybe<Maybe<{ node?: Maybe<T> }>[]> = []
): T[] =>
  edges?.reduce((list, edge) => {
    if (!edge?.node) {
      return list;
    }

    return [...list, edge.node];
  }, [] as T[]) ?? [];
