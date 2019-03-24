import React from "react";
import styled from "styled-components/macro";
import { DeduplicatedMove, Type } from "../../types";
import TypeTag from "../TypeTag";
import Label from "../Label";
import * as variables from "../../helpers/variables";
import { getTypeGradient } from "../../helpers/gradients";

interface Props extends DeduplicatedMove {}

interface RowProps {
  types: { name: Type }[];
}

const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr 3fr;
  text-align: center;

  > :first-child {
    text-align: left;
  }

  > :last-child {
    text-align: right;
  }

  &::before {
    content: "";
    position: absolute;
    top: calc(${variables.spacing.sm}px / 2 * -1);
    display: block;
    width: 100%;
    height: ${variables.spacing.sm}px;
    background-image: ${({ types }: RowProps) => getTypeGradient(types)};
  }
`;

const Value = styled(Label)`
  color: ${variables.colors.grayDarker};
  font-size: ${variables.fontSizes.sm}px;
  height: ${variables.spacing.xl}px;
`;

const MoveLine = ({ name, types, damageClass, pp, accuracy, power }: Props) => (
  <Row types={[...types, { name: damageClass }]}>
    <Value>{name}</Value>
    <div>
      <Label>PP</Label> <Value>{pp}</Value>
    </div>
    <div>
      <Label>Accuracy</Label> <Value>{accuracy || "n/a"}</Value>
    </div>
    <div>
      <Label>Power</Label> <Value>{power || "n/a"}</Value>
    </div>
    <div>
      {types.map(type => (
        <TypeTag key={type.name} type={type.name}>
          {type.name}
        </TypeTag>
      ))}
      <TypeTag type={damageClass}>{damageClass}</TypeTag>
    </div>
  </Row>
);

export default MoveLine;
