import Form from './Form.js';
import Home from './Home.js';
import './App.css';

const BackgroundColor = "#D3D3D3";

function App() {
  return (
    <div className="App" style={{ backgroundColor: BackgroundColor  }}>
      <Home/>
      <Form/>
    </div>
  );
}

export default App;
