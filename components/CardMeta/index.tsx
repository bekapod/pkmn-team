import React from "react";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import Label from "../Label";

interface Props {
  id: string;
  items?: {
    label: string;
    value: string | number;
  }[];
}

const CardMetaWrapper = styled.div`
  display: flex;
  margin: ${variables.spacing.md}px 0;
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
    content: "";
    position: absolute;
    right: calc(${variables.spacing.xs}px / 2 * -1);
    top: 50%;
    width: ${variables.spacing.xs}px;
    height: 33px;
    background-color: ${variables.colors.grayLight};
    transform: translateY(-50%);
    border-radius: ${variables.spacing.xs}px;
  }

  &:last-child::after {
    display: none;
  }
`;

const CardMetaValue = styled.span`
  color: ${variables.colors.grayDark};
  font-size: ${variables.fontSizes.md}px;
  font-weight: 900;
  line-height: ${lineHeight("md")};
`;

const CardMeta = ({ id, items = [] }: Props): JSX.Element => (
  <CardMetaWrapper data-testid={`card-meta-${id}`}>
    {items.map(
      ({ label, value }): JSX.Element => (
        <CardMetaItem key={`Team: ${id}, Label: ${label}`}>
          <Label>{label}</Label>
          <CardMetaValue>{value}</CardMetaValue>
        </CardMetaItem>
      )
    )}
  </CardMetaWrapper>
);

export default CardMeta;
