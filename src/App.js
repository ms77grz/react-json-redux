import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { AddUser } from './pages/AddUser';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/addUser' component={AddUser} />
      </Switch>
    </div>
  );
}

export default App;
