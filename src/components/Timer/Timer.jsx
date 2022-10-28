import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

const StartedTimer = (props) => {
  const formatNumber = props.formatNumber;
  let [timeTimer, setTimeTimer] = useState({
    minutes: formatNumber(props.minutes),
    seconds: formatNumber(props.seconds),
  });

  const tick = () => {
    if (!props.status) return;
    setTimeTimer(({ minutes: minutesState, seconds: secondsState }) => {
      let secondsUpdate = parseInt(secondsState);
      let minutesUpdate = parseInt(minutesState);
      if (secondsUpdate > 0) {
        secondsUpdate = secondsUpdate - 1;
      } else if (secondsUpdate === 0) {
        if (minutesUpdate !== 0) {
          minutesUpdate = minutesUpdate - 1;
          secondsUpdate = 59;
        }
      }

      return {
        seconds: formatNumber(secondsUpdate),
        minutes: formatNumber(minutesUpdate),
      };
    });
  };

  useEffect(() => {
    let timerID = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timerID);
  });

  useEffect(
    () => setTimeTimer({ minutes: formatNumber(props.minutes), seconds: formatNumber(props.seconds) }),
    [props.minutes, props.seconds],
  );

  let { minutes, seconds } = timeTimer;
  return (
    <>
      {minutes}:{seconds}
    </>
  );
};

const Timer = (props) => {
  let [statusTimer, setStatusTimer] = useState(false);
  let { className, formatNumber, minutes, seconds } = props;

  useEffect(() => {
    setStatusTimer(false);
  }, [props.minutes, props.seconds]);

  return (
    <span className={`${className} timer`}>
      <button
        className="timer__icon-button icon icon-play"
        onClick={() => setStatusTimer(true)}
        aria-label={'button start timer for current task'}
      ></button>
      <button
        className="timer__icon-button icon icon-pause"
        onClick={() => setStatusTimer(false)}
        aria-label={'button stop timer for current task'}
      ></button>
      <span className="timer__time">
        <StartedTimer formatNumber={formatNumber} minutes={minutes} seconds={seconds} status={statusTimer} />
      </span>
    </span>
  );
};

Timer.defaultProps = {
  formatNumber: (number) => number,
  minutes: '0',
  seconds: '0',
};

Timer.propTypes = {
  formatNumber: PropTypes.func,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
};

export default Timer;
