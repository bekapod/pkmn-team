import styled from 'styled-components/macro';
import { Types } from '~/generated/graphql';
import { zoomIn } from '~/lib/animations';
import { getTypeGradient } from '~/lib/gradients';

type CardHeaderProps = {
  types: Pick<Types, 'name' | 'slug'>[];
};

export const CardLink = styled.a`
  ${zoomIn}
  color: initial;
  text-decoration: none;
`;

export const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CardHeader = styled.header<CardHeaderProps>`
  overflow: hidden;
  margin-bottom: calc(var(--spacing-xl) * -1);
  padding: 0 var(--spacing-md) var(--spacing-lg);
  color: var(--color-white);
  text-shadow: 0 1px 0px var(--color-gray-darker),
    1px 0 0px var(--color-gray-dark), 1px 2px 0px var(--color-gray-darker),
    2px 1px 0px var(--color-gray-dark), 2px 3px 0px var(--color-gray-darker),
    3px 2px 0px var(--color-gray-dark);
  background-image: ${({ types }) => getTypeGradient(types)};
  border-radius: var(--border-radius) 0 0 0;
`;

export const CardHeading = styled.h2`
  overflow: hidden;
  margin: var(--spacing-md) 0;
  font-size: var(--font-size-lg);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  margin: var(--spacing-md) var(--spacing-sm) 0;
  padding: 0 var(--spacing-sm);
  background-color: var(--color-white);
  border-radius: 0 0 var(--border-radius) 0;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(var(--zig-zag) / 2 * -1);
    width: 100%;
    height: calc(var(--zig-zag) / 2);
    background: linear-gradient(
        -45deg,
        var(--color-white) var(--zig-zag),
        transparent 0
      ),
      linear-gradient(45deg, var(--color-white) var(--zig-zag), transparent 0);
    background-repeat: repeat-x;
    background-position: left top;
    background-size: var(--zig-zag) 46px;
  }
`;
