import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { Label } from '../Label';

const CardMetaWrapper = styled.div`
  display: flex;
  margin: var(--spacing-md) 0;
`;

const CardMetaItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  align-items: center;
  text-align: center;
  &::after {
    content: '';
    position: absolute;
    right: calc(var(--spacing-xs) / 2 * -1);
    top: 50%;
    width: var(--spacing-xs);
    height: var(--spacing-lg);
    background-color: var(--color-gray-light);
    transform: translateY(-50%);
    border-radius: var(--spacing-xs);
  }
  &:last-child::after {
    display: none;
  }
`;

const CardMetaValue = styled.span`
  color: var(--color-gray-dark);
  font-size: var(--font-size-md);
  line-height: var(--spacing-md);
  font-weight: 900;
`;

export type CardMetaProps = {
  id: string;
  items?: {
    label: string;
    value: string | number;
  }[];
};

export const CardMeta: FunctionComponent<CardMetaProps> = ({
  id,
  items = []
}) => (
  <CardMetaWrapper data-testid={`card-meta-${id}`}>
    {items.map(({ label, value }) => (
      <CardMetaItem key={label}>
        <Label>{label}</Label>
        <CardMetaValue>{value}</CardMetaValue>
      </CardMetaItem>
    ))}
  </CardMetaWrapper>
);
