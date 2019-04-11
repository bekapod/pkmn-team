// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import Tabs, { GetTabItemProps, GetTabContentProps } from "."; // eslint-disable-line import/named

const items = ["Tab 1", "Tab 2", "Tab 3", "Tab 4"];

storiesOf("Tabs", module).add("default", () => (
  <Tabs
    selectedItem="1"
    render={(
      getTabItemProps: GetTabItemProps,
      getTabContentProps: GetTabContentProps
    ) => (
      <>
        {items.map(item => {
          const tabItemProps = getTabItemProps(item);
          const tabContentProps = getTabContentProps(item);

          return (
            <div key={item}>
              <div {...tabItemProps}>{item}</div>
              <div {...tabContentProps}>{item} Content</div>
            </div>
          );
        })}
      </>
    )}
  />
));
