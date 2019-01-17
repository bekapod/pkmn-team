import React, { Component, KeyboardEvent } from "react";
import wait from "waait";

interface IRenderProps {
  getTabItemProps: (
    _: string
  ) => {
    id: string;
    role: string;
    "aria-selected": boolean;
    tabIndex: number;
    onClick: () => void;
  };
  getTabContentProps: (
    _: string
  ) => { "aria-hidden": boolean; "aria-labelledby": string };
}

interface IState {
  selectedItem?: string;
}

interface IProps {
  selectedItem: string;
  children: (_: IRenderProps) => JSX.Element;
}

class Tabs extends Component<IProps> {
  public static getDerivedStateFromProps(props: IProps, state: IState) {
    if (state.selectedItem) {
      return state;
    }

    return {
      ...state,
      selectedItem: props.selectedItem
    };
  }

  public state: IState = {
    selectedItem: undefined
  };

  private contentRefs: { [key: string]: HTMLElement } = {};

  constructor(props: IProps) {
    super(props);

    this.getTabItemProps = this.getTabItemProps.bind(this);
    this.getTabContentProps = this.getTabContentProps.bind(this);
    this.addTabContentRef = this.addTabContentRef.bind(this);
    this.onTabItemClick = this.onTabItemClick.bind(this);

    this.state = {
      selectedItem: props.selectedItem
    };
  }

  public addTabContentRef(id: string) {
    return (element: HTMLElement) => {
      this.contentRefs[id] = element;
    };
  }

  public onTabItemClick(id: string) {
    return () => {
      this.setState(() => ({ selectedItem: id }));
    };
  }

  public onTabItemKey(id: string) {
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

  public getTabItemProps(id: string) {
    const isSelected = id === this.state.selectedItem;

    return {
      "aria-selected": isSelected,
      id: `tab-item-${id}`,
      onClick: this.onTabItemClick(id),
      onKeyDown: this.onTabItemKey(id),
      role: "link",
      tabIndex: 0
    };
  }

  public getTabContentProps(id: string) {
    const isSelected = id === this.state.selectedItem;

    return {
      "aria-hidden": !isSelected,
      "aria-labelledby": `tab-item-${id}`,
      ref: this.addTabContentRef(id)
    };
  }

  public render() {
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
