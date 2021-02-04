import { Switch, Route } from 'react-router-dom';

import Employees from './components/Employees';

import './App.css';

function App() {
  return  (
    <Switch>
      <Route path="/" component={Employees} />
    </Switch>
  );
}

export default App;
