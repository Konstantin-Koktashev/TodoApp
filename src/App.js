import React from 'react';

import './App.css';
import TodoApp from './features/todos/todoApp'
import { Switch, Route } from 'react-router-dom';
import TodoDetails from './features/todos/todoDetails';
function App() {
  return (
    <div className="App">
    <Switch>
      <Route path='/:id' component={TodoDetails}></Route>
      <Route path='/' component={TodoApp}></Route>
    </Switch>
     {/* <TodoApp></TodoApp> */}
    </div>
  );
}

export default App;
