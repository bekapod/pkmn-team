import React, { PureComponent } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State {
  intervalId?: number;
}

const withScrollToTop = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> => {
  return class extends PureComponent<P & Props, State> {
    public state = {
      intervalId: undefined
    };

    private scrollStepInPx = 50;

    private delayInMs = 16.66;

    public constructor(props: P & Props) {
      super(props);

      this.scrollStep = this.scrollStep.bind(this);
      this.scrollToTop = this.scrollToTop.bind(this);
    }

    public scrollToTop(): void {
      const intervalId = setInterval(this.scrollStep, this.delayInMs);
      this.setState(() => ({
        intervalId
      }));
    }

    private scrollStep(): void {
      const { intervalId } = this.state;

      if (window.pageYOffset === 0 && intervalId) {
        clearInterval(intervalId);
      }

      window.scroll(0, window.pageYOffset - this.scrollStepInPx);
    }

    public render(): JSX.Element {
      return (
        <WrappedComponent scrollToTop={this.scrollToTop} {...this.props} />
      );
    }
  };
};

export default withScrollToTop;
