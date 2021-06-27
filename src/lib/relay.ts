import { Maybe } from '~/generated/graphql';

export const extractEdges = <T>(edges: Maybe<Maybe<T>[]> = []): T[] =>
  edges?.filter((edge): edge is T => !!edge) ?? [];

export const extractNodesFromEdges = <T>(
  edges: Maybe<Maybe<{ node?: Maybe<T> }>[]> = []
): T[] =>
  edges?.reduce((list, edge) => {
    if (!edge?.node) {
      return list;
    }

    return [...list, edge.node];
  }, [] as T[]) ?? [];
