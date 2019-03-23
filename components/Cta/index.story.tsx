// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import { CtaButton, CtaInternalLink } from ".";

storiesOf("Cta/CtaInternalLink", module)
  .add("default", () => <CtaInternalLink>Dashboard</CtaInternalLink>)
  .add("secondary", () => (
    <CtaInternalLink secondary>Dashboard</CtaInternalLink>
  ))
  .add("small", () => <CtaInternalLink small>Dashboard</CtaInternalLink>);

storiesOf("Cta/CtaButton", module)
  .add("default", () => (
    <CtaButton onClick={action("clicked")}>Create Team</CtaButton>
  ))
  .add("secondary", () => (
    <CtaButton onClick={action("clicked")} secondary>
      Create Team
    </CtaButton>
  ))
  .add("small", () => (
    <CtaButton onClick={action("clicked")} small>
      Create Team
    </CtaButton>
  ));
