import { storiesOf } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import { CtaButton, CtaInternalLink } from ".";

storiesOf("Cta/CtaInternalLink", module)
  .add(
    "default",
    (): JSX.Element => <CtaInternalLink>Dashboard</CtaInternalLink>
  )
  .add(
    "secondary",
    (): JSX.Element => <CtaInternalLink secondary>Dashboard</CtaInternalLink>
  )
  .add(
    "small",
    (): JSX.Element => <CtaInternalLink small>Dashboard</CtaInternalLink>
  );

storiesOf("Cta/CtaButton", module)
  .add(
    "default",
    (): JSX.Element => (
      <CtaButton onClick={action("clicked")}>Create Team</CtaButton>
    )
  )
  .add(
    "secondary",
    (): JSX.Element => (
      <CtaButton onClick={action("clicked")} secondary>
        Create Team
      </CtaButton>
    )
  )
  .add(
    "small",
    (): JSX.Element => (
      <CtaButton onClick={action("clicked")} small>
        Create Team
      </CtaButton>
    )
  );
