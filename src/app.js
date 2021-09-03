class App extends React.Component {

  render() {
    return (
      <div className='homepage' id="reacter">
          <h1 className='title'>Budget API</h1>
          <Methods />
      </div>
    );
  }
}

let domContainer = document.getElementById('app');
ReactDOM.render(<App />, domContainer);