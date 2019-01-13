import React, { Component } from 'react';
import data from './fish-data.jsx';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: [...data],
      selected: Math.floor(Math.random() * data.length),
      isContent: false,
    };
  }

  onCorrect = () => {
    const { data, selected } = this.state;
    const newData = [...data];
    newData.splice(selected, 1); 
    this.setState({
      data: newData,
      selected: Math.floor(Math.random() * newData.length),
      isContent: false,
    });
  }

  onIncorrect = () => {
    this.setState({
      selected: Math.floor(Math.random() * this.state.data.length),
      isContent: false,
    });
  }

  onReverse = () => {
    this.setState({
      isContent: !this.state.isContent,
    });
  }

  render() {
    const {
      onCorrect,
      onIncorrect,
      onReverse,
      state: { data, selected, isContent },
    } = this;

    return (
      <div className="App">
        {data.length > 0 ?
        <div className="Fish" onClick={onReverse}>
          <h1 className="Fish-title">{data[selected].title}</h1>
          {isContent ?
          <div className="Fish-content">
            {data[selected].content}
          </div> : null}
        </div> : <div>Success, you finished it all!</div>}
        <div className="Menu">
          <button className="correct" onClick={onCorrect}>Correct</button>
          <span className="items-left">{data.length}</span>
          <button className="incorrect" onClick={onIncorrect}>Incorrect</button>
        </div>
      </div>
    );
  }
}

export default App;