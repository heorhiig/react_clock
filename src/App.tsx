/* eslint-disable react/no-unused-state */
import React from 'react';
import './App.scss';
import { Clock } from './Clock/clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  today: Date;
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, State> {
  timerId: number | null = null;

  state: State = {
    today: new Date(),
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount(): void {
    // eslint-disable-next-line no-console
    console.info(this.state.today.toLocaleTimeString());
    document.addEventListener('contextmenu', this.handlRigthClic);
    document.addEventListener('click', this.handlLeftClic);

    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);
  }

  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.handlRigthClic);
    document.removeEventListener('click', this.handlLeftClic);

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }
  }

  handlRigthClic = (event: MouseEvent): void => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handlLeftClic = (): void => {
    this.setState({ hasClock: true });
  };

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        <Clock name={this.state.clockName} />
      </div>
    );
  }
}
