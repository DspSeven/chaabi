import React, { Component } from 'react';
import './index.css';

const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      initialValue: this.getRandomKey(),
      minutes: 5,
      seconds: 0,
      inProgress: false,
      inputFieldError: false,
      questionedKeys: [],
      answeredKeys: [],
      testCompleted: false,
    };
    this.myInterval = null;
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  getRandomKey = () => {
    return keys[Math.floor(Math.random() * keys.length)];
  };

  searchValChange = (event) => {
    this.setState({ inputVal: event.target.value });
  };

  verifyKey = (event) => {
    const { initialValue } = this.state;
    if (event.key !== 'Backspace') {
      this.setState((prevState) => ({
        questionedKeys: [...prevState.questionedKeys, initialValue],
      }));
      if (initialValue === event.key) {
        this.setState((prevState) => ({
          initialValue: this.getRandomKey(),
          inputVal: '',
          inputFieldError: false,
          answeredKeys: [...prevState.answeredKeys, initialValue],
        }));
      } else {
        this.setState({ inputFieldError: true, inputVal: '' });
      }
    }
  };

  startBtn = () => {
    this.setState({ inProgress: true });
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
          this.setState({ testCompleted: true });
        } else {
          this.setState((prevState) => ({
            minutes: prevState.minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  restartBtnClicked = () => {
    this.resetState();
    clearInterval(this.myInterval);
  };

  stopBtnClicked = () => {
    this.resetState();
    clearInterval(this.myInterval);
  };

  resetState = () => {
    this.setState({
      inputVal: '',
      initialValue: this.getRandomKey(),
      minutes: 5,
      seconds: 0,
      inProgress: false,
      inputFieldError: false,
      questionedKeys: [],
      answeredKeys: [],
      testCompleted: false,
    });
  };

  renderResultView = () => {
    const { minutes, seconds, questionedKeys, answeredKeys } = this.state;
    const totalKeysPressed = answeredKeys.length;
    const accuracy = totalKeysPressed > 0 ? Math.ceil((totalKeysPressed / questionedKeys.length) * 100) : 0;
    const wpm = totalKeysPressed;
    const kpm = Math.ceil(wpm / 5);

    return (
      <>
        <h1 className="resultsHeading">Results</h1>
        <ul className="resultsList">
          <li className="resultItem">
            <p className="resultsTextCSS">Total Keys Pressed: {wpm}</p>
          </li>
          <li className="resultItem">
            <p className="resultsTextCSS">Accuracy: {accuracy}%</p>
          </li>
        </>
)
}
export default MainPage
