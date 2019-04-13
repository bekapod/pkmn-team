import React from "react";
import { fireEvent, render } from "react-testing-library";
import wait from "waait";
import Tabs, { GetTabItemProps, GetTabContentProps } from "."; // eslint-disable-line import/named

describe("<Tabs />", (): void => {
  const items = ["1", "2", "3", "4"];
  const tabs = (
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
                  <div data-testid={`tab-item-${item}`} {...tabItemProps} />
                  <div
                    data-testid={`tab-content-${item}`}
                    {...tabContentProps}
                  />
                </div>
              );
            }
          )}
        </>
      )}
    />
  );

  it("renders correct attributes", (): void => {
    const { getByTestId } = render(tabs);

    expect(getByTestId("tab-item-1").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(getByTestId("tab-item-1").getAttribute("id")).toBe("tab-item-1");
    expect(getByTestId("tab-item-1").getAttribute("role")).toBe("link");
    expect(getByTestId("tab-item-1").getAttribute("tabindex")).toBe("0");

    expect(getByTestId("tab-item-2").getAttribute("aria-selected")).toBe(
      "false"
    );

    expect(getByTestId("tab-content-1").getAttribute("aria-hidden")).toBe(
      "false"
    );
    expect(getByTestId("tab-content-1").getAttribute("aria-labelledby")).toBe(
      "tab-item-1"
    );

    expect(getByTestId("tab-content-2").getAttribute("aria-hidden")).toBe(
      "true"
    );
  });

  it("changes the selected item on item click", (): void => {
    const { getByTestId } = render(tabs);

    expect(getByTestId("tab-item-1").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(getByTestId("tab-content-1").getAttribute("aria-hidden")).toBe(
      "false"
    );

    fireEvent.click(getByTestId("tab-item-2"));

    expect(getByTestId("tab-item-1").getAttribute("aria-selected")).toBe(
      "false"
    );
    expect(getByTestId("tab-content-1").getAttribute("aria-hidden")).toBe(
      "true"
    );
    expect(getByTestId("tab-item-2").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(getByTestId("tab-content-2").getAttribute("aria-hidden")).toBe(
      "false"
    );
  });

  it("changes the selected item on enter key and focuses tab content", async (): Promise<
    void
  > => {
    const { getByTestId } = render(tabs);

    expect(getByTestId("tab-item-1").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(getByTestId("tab-content-1").getAttribute("aria-hidden")).toBe(
      "false"
    );
    expect(document.activeElement).not.toBe(getByTestId("tab-content-2"));

    fireEvent.keyDown(getByTestId("tab-item-2"), { key: "Enter" });

    expect(getByTestId("tab-item-1").getAttribute("aria-selected")).toBe(
      "false"
    );
    expect(getByTestId("tab-content-1").getAttribute("aria-hidden")).toBe(
      "true"
    );
    expect(getByTestId("tab-item-2").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(getByTestId("tab-content-2").getAttribute("aria-hidden")).toBe(
      "false"
    );

    await wait(1);
    expect(document.activeElement).toBe(getByTestId("tab-content-2"));
  });
});
