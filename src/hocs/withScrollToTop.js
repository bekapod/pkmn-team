/* global IntervalID */
// @flow
import * as React from "react";

type Props = {};

type State = {
  intervalId?: IntervalID
};

function withScrollToTop(WrappedComponent: React.ComponentType<*>) {
  return class extends React.PureComponent<Props, State> {
    constructor(props: Props) {
      super(props);

      this.scrollStep = this.scrollStep.bind(this);
      this.scrollToTop = this.scrollToTop.bind(this);
    }

    state = {
      intervalId: undefined
    };

    scrollStepInPx: number = 50;
    delayInMs: number = 16.66;

    scrollStep: () => void;
    scrollStep() {
      if (window.pageYOffset === 0 && this.state.intervalId) {
        clearInterval(this.state.intervalId);
      }

      window.scroll(0, window.pageYOffset - this.scrollStepInPx);
    }

    scrollToTop: () => void;
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
