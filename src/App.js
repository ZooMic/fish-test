import React, { Component } from 'react';
import data from './fish-data.jsx';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    const newData = [];
    newData.push([...data]);

    this.state = {
      data: newData,
      selected: Math.floor(Math.random() * newData[0].length),
      selectedRow: 0,
      isContent: false,
      isDocument: false,
    };
  }

  onCorrect = () => {
    const { data, selected, selectedRow } = this.state;
    data[selectedRow].splice(selected, 1);
    const newSelectedRow = data[selectedRow].length > 0 ? selectedRow : selectedRow + 1;

    this.setState({
      data: [...data],
      selected: Math.floor(Math.random() * data[newSelectedRow].length),
      isContent: false,
      selectedRow: newSelectedRow,
    });
  }

  onIncorrect = () => {
    const { data, selectedRow, selected } = this.state;

    if (data[selectedRow+1] === undefined) {
      data.push([]);
    }
    
    data[selectedRow + 1].push(data[selectedRow][selected]);
    data[selectedRow].splice(selected, 1);

    const newSelectedRow = data[selectedRow].length > 0 ? selectedRow : selectedRow + 1;

    this.setState({
      data: [...data],
      selected: Math.floor(Math.random() * data[newSelectedRow].length),
      isContent: false,
      selectedRow: newSelectedRow,
    });
  }

  onReverse = () => {
    this.setState({
      isContent: !this.state.isContent,
    });
  }

  onDocument = () => {
    this.setState({
      isDocument: !this.state.isDocument,
    });
  }

  render() {
    const {
      onCorrect,
      onIncorrect,
      onReverse,
      onDocument,
      state: { data, selected, selectedRow, isContent, isDocument },
    } = this;
    
    
    const newData = [];
    data.forEach(arr => {
      arr.forEach(item => newData.push(item));
    });

    if (isDocument) {
      return (
        <div className="App">
          <button className="all-size" onClick={onDocument}>Quiz</button>
            {
              newData.map((item, id) => (
                <div className="Fish" onClick={onReverse} key={`fish-${id}`}>
                  <h1 className="Fish-title">{item.title}</h1>
                  <div className="Fish-content">
                    {item.content}
                  </div>
                </div>
                ))
            }
        </div>
      );
    } else {
      return (
        <div className="App">
          <button className="all-size" onClick={onDocument}>Document</button>
          {data[selectedRow].length > 0 ?
          <div className="Fish" onClick={onReverse}>
            <h1 className="Fish-title">{data[selectedRow][selected].title}</h1>
            {isContent ?
            <div className="Fish-content">
              {data[selectedRow][selected].content}
            </div> : null}
          </div> : <div>Success, you finished it all!</div>}
          <div className="Menu">
            <button className="correct" onClick={onCorrect}>Correct</button>
            <span className="items-left">{newData.length}</span>
            <button className="incorrect" onClick={onIncorrect}>Incorrect</button>
          </div>
        </div>
      );
    }    
  }
}

export default App;
