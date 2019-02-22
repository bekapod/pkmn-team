import React, { Component, KeyboardEvent, MouseEventHandler } from "react";
import wait from "waait";

interface RenderProps {
  getTabItemProps: (
    _: string
  ) => {
    id: string;
    role: string;
    "aria-selected": boolean;
    tabIndex: number;
    onClick: MouseEventHandler;
    onKeyDown: (e: KeyboardEvent) => any;
  };
  getTabContentProps: (
    _: string
  ) => { "aria-hidden": boolean; "aria-labelledby": string };
}

interface State {
  selectedItem?: string;
}

interface Props {
  selectedItem: string;
  children: (_: RenderProps) => JSX.Element;
}

class Tabs extends Component<Props> {
  public static getDerivedStateFromProps(props: Props, state: State): State {
    if (state.selectedItem) {
      return state;
    }

    return {
      ...state,
      selectedItem: props.selectedItem
    };
  }

  public state: State = {
    selectedItem: undefined
  };

  private contentRefs: { [key: string]: HTMLElement } = {};

  public constructor(props: Props) {
    super(props);

    this.getTabItemProps = this.getTabItemProps.bind(this);
    this.getTabContentProps = this.getTabContentProps.bind(this);
    this.addTabContentRef = this.addTabContentRef.bind(this);
    this.onTabItemClick = this.onTabItemClick.bind(this);

    this.state = {
      selectedItem: props.selectedItem
    };
  }

  public onTabItemClick(id: string): () => void {
    return () => {
      this.setState(() => ({ selectedItem: id }));
    };
  }

  public onTabItemKey(id: string): (e: KeyboardEvent) => Promise<void> {
    return async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const ref = this.contentRefs[id];
        this.onTabItemClick(id)();

        if (ref instanceof HTMLElement) {
          await wait(1);

          this.setState(() => {
            ref.setAttribute("tabindex", "-1");
            ref.focus();
          });
        }
      }
    };
  }

  public getTabItemProps(
    id: string
  ): {
    "aria-selected": boolean;
    id: string;
    onClick: MouseEventHandler;
    onKeyDown: (e: KeyboardEvent) => any;
    role: string;
    tabIndex: number;
  } {
    const { selectedItem } = this.state;
    const isSelected = id === selectedItem;

    return {
      "aria-selected": isSelected,
      id: `tab-item-${id}`,
      onClick: this.onTabItemClick(id),
      onKeyDown: this.onTabItemKey(id),
      role: "link",
      tabIndex: 0
    };
  }

  public getTabContentProps(
    id: string
  ): {
    "aria-hidden": boolean;
    "aria-labelledby": string;
    ref: (element: HTMLElement) => void;
  } {
    const { selectedItem } = this.state;
    const isSelected = id === selectedItem;

    return {
      "aria-hidden": !isSelected,
      "aria-labelledby": `tab-item-${id}`,
      ref: this.addTabContentRef(id)
    };
  }

  public addTabContentRef(id: string): (element: HTMLElement) => void {
    return (element: HTMLElement) => {
      this.contentRefs[id] = element;
    };
  }

  public render(): JSX.Element {
    const { children: Children } = this.props;

    return (
      <Children
        getTabItemProps={this.getTabItemProps}
        getTabContentProps={this.getTabContentProps}
      />
    );
  }
}

export default Tabs;
