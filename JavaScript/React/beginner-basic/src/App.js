import logo from './logo.svg';
import './App.css';//JavaScript固有の構文ではなく、webpackによるimport

//React のコンポーネントpropsは、常にオブジェクトに集約される。
function App(props) {
  const subject = props.subject;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello,{subject}!
        </p>
      </header>
    </div>
  );
}

export default App;
