// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import Tabs from ".";

const items = ["Tab 1", "Tab 2", "Tab 3", "Tab 4"];

storiesOf("Tabs", module).add("default", () => (
  <Tabs selectedItem="1">
    {({ getTabItemProps, getTabContentProps }) => (
      <>
        {items.map(item => {
          const tabItemProps = getTabItemProps(item);
          const tabContentProps = getTabContentProps(item);

          return (
            <div key={item}>
              <div data-testid={`tab-item-${item}`} {...tabItemProps}>
                {item}
              </div>
              <div data-testid={`tab-content-${item}`} {...tabContentProps}>
                {item} content
              </div>
            </div>
          );
        })}
      </>
    )}
  </Tabs>
));
