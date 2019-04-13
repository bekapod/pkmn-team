import { storiesOf } from "@storybook/react";
import React from "react";
import Tabs, { GetTabItemProps, GetTabContentProps } from "."; // eslint-disable-line import/named

const items = ["Tab 1", "Tab 2", "Tab 3", "Tab 4"];

storiesOf("Tabs", module).add(
  "default",
  (): JSX.Element => (
    <Tabs
      selectedItem="1"
      render={(
        getTabItemProps: GetTabItemProps,
        getTabContentProps: GetTabContentProps
      ): JSX.Element => (
        <>
          {items.map(
            (item): JSX.Element => {
              const tabItemProps = getTabItemProps(item);
              const tabContentProps = getTabContentProps(item);

              return (
                <div key={item}>
                  <div {...tabItemProps}>{item}</div>
                  <div {...tabContentProps}>{item} Content</div>
                </div>
              );
            }
          )}
        </>
      )}
    />
  )
);
