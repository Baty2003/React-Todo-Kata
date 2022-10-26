// import { set } from 'date-fns';
import React, { useState, useEffect } from 'react';
import './Timer.css';

const StartedTimer = (props) => {
  const formatNumber = props.formatNumber;

  const changeTimer = (timerId) => {
    props.setTimeTimer(({ minutes: minutesState, seconds: secondsState }) => {
      let secondsUpdate = parseInt(secondsState);
      let minutesUpdate = parseInt(minutesState);
      if (secondsUpdate > 0) {
        secondsUpdate = secondsUpdate - 1;
      } else if (secondsUpdate === 0) {
        if (minutesUpdate !== 0) {
          minutesUpdate = minutesUpdate - 1;
          secondsUpdate = 59;
        } else {
          clearInterval(timerId);
        }
      }

      return {
        seconds: formatNumber(secondsUpdate),
        minutes: formatNumber(minutesUpdate),
      };
    });
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      changeTimer(timerId);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  let { minutes, seconds } = props.timeTimer;
  return (
    <>
      {minutes}:{seconds}
    </>
  );
};

const Timer = (props) => {
  const formatNumber = props.formatNumber;

  let [timeTimer, setTimeTimer] = useState({
    minutes: formatNumber(props.minutes),
    seconds: formatNumber(props.seconds),
  });
  let [statusTimer, setStatusTimer] = useState(false);

  useEffect(() => {
    setStatusTimer(false);
    setTimeTimer({ minutes: formatNumber(props.minutes), seconds: formatNumber(props.seconds) });
  }, [props.minutes, props.seconds]);

  let { className } = props;
  let { minutes, seconds } = timeTimer;
  return (
    <span className={`${className} timer`}>
      <button className="timer__icon-button icon icon-play" onClick={() => setStatusTimer(true)}></button>
      <button className="timer__icon-button icon icon-pause" onClick={() => setStatusTimer(false)}></button>
      <span className="timer__time">
        {statusTimer ? (
          <StartedTimer timeTimer={timeTimer} formatNumber={formatNumber} setTimeTimer={setTimeTimer} />
        ) : (
          `${minutes}:${seconds}`
        )}
      </span>
    </span>
  );
};

export default Timer;
