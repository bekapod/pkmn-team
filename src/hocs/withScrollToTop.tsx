import React, { Component, PureComponent } from "react";

type Props = {};

interface State {
  intervalId?: NodeJS.Timeout;
};

const withScrollToTop = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class extends PureComponent<P & Props, State> {
    constructor(props: P & Props) {
      super(props);

      this.scrollStep = this.scrollStep.bind(this);
      this.scrollToTop = this.scrollToTop.bind(this);
    }

    state = {
      intervalId: undefined
    };

    scrollStepInPx: number = 50;
    delayInMs: number = 16.66;

    scrollStep() {
      if (window.pageYOffset === 0 && this.state.intervalId) {
        clearInterval(this.state.intervalId);
      }

      window.scroll(0, window.pageYOffset - this.scrollStepInPx);
    }

    scrollToTop() {
      const intervalId = setInterval(this.scrollStep, this.delayInMs);
      this.setState(() => ({
        intervalId
      }));
    }

    render() {
      return (
        <WrappedComponent scrollToTop={this.scrollToTop} {...this.props} />
      );
    }
  };
}

export default withScrollToTop;
