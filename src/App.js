import React, {useState, useEffect} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import './App.scss';
import BubbleChart from './Components/BubbleChart/BubbleChart';
import Homepage from './Components/Homepage/Homepage';
import Quiz from './Components/Quiz/Quiz';
import Form from './Components/Form/Form'
import Nav from './Components/Nav/Nav'
import CustomQs from './Components/CustomQs/CustomQs';

function App() {


  return (
    <div className="App">
        <header>
          <Nav />
        </header>
        <main>
          <Switch>
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route exact path='/quiz'>
                <Quiz />
                <BubbleChart />
            </Route>
            <Route exact path='/customquestion'>
                <Form />
            </Route>
            <Route exact path='/editquestion'>
                <Form />
            </Route>
            <Route exact path='/customlist'>
                <CustomQs />
            </Route>
          </Switch>
        </main>
    </div>
  );
}

export default App;
