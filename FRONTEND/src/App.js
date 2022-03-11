import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import ListsEmployees from './components/ListsEmployees'

function App() {
  return (
    <div className="App">
        <Header />
        <ListsEmployees />
    </div>
  );
}

export default App;
