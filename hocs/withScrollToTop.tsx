import React, { PureComponent } from "react";

// tslint:disable-next-line:no-empty-interface
interface IProps {}

interface IState {
  intervalId?: number;
}

const withScrollToTop = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends PureComponent<P & IProps, IState> {
    public state = {
      intervalId: undefined
    };

    private scrollStepInPx = 50;
    private delayInMs = 16.66;

    constructor(props: P & IProps) {
      super(props);

      this.scrollStep = this.scrollStep.bind(this);
      this.scrollToTop = this.scrollToTop.bind(this);
    }

    public scrollToTop() {
      const intervalId = setInterval(this.scrollStep, this.delayInMs);
      this.setState(() => ({
        intervalId
      }));
    }

    public render() {
      return (
        <WrappedComponent scrollToTop={this.scrollToTop} {...this.props} />
      );
    }

    private scrollStep() {
      if (window.pageYOffset === 0 && this.state.intervalId) {
        clearInterval(this.state.intervalId);
      }

      window.scroll(0, window.pageYOffset - this.scrollStepInPx);
    }
  };
};

export default withScrollToTop;
