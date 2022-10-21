import React, { Component } from 'react';
import './Timer.css';
export default class Timer extends Component {
  formatNumber = this.props.formatNumber;

  state = {
    minutes: this.formatNumber(this.props.minutes),
    seconds: this.formatNumber(this.props.seconds),
  };

  timerId = null;
  timerText = React.createRef();

  startTimer = () => {
    if (this.timerId) return;
    this.timerId = setInterval(this.changeTimer, 1000);
  };

  changeTimer = () => {
    this.setState(({ seconds: secondsState, minutes: minutesState }) => {
      let secondsUpdate = parseInt(secondsState);
      let minutesUpdate = parseInt(minutesState);
      if (secondsUpdate > 0) {
        secondsUpdate = secondsUpdate - 1;
      } else if (secondsUpdate === 0) {
        if (minutesUpdate !== 0) {
          minutesUpdate = minutesUpdate - 1;
          secondsUpdate = 59;
        } else {
          clearInterval(this.timerId);
        }
      }

      return {
        seconds: this.formatNumber(secondsUpdate),
        minutes: this.formatNumber(minutesUpdate),
      };
    });
  };

  stopTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.minutes != this.props.minutes || prevProps.seconds != this.props.seconds)
      this.setState(() => {
        return { minutes: this.formatNumber(this.props.minutes), seconds: this.formatNumber(this.props.seconds) };
      });
  }

  render() {
    let { className } = this.props;
    let { minutes, seconds } = this.state;
    return (
      <span className={`${className} timer`}>
        <button className="timer__icon-button icon icon-play" onClick={this.startTimer}></button>
        <button className="timer__icon-button icon icon-pause" onClick={this.stopTimer}></button>
        <span className="timer__time" ref={this.timerText}>
          {minutes}:{seconds}
        </span>
      </span>
    );
  }
}
