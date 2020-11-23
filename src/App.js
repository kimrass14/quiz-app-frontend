import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.scss';
import BubbleChart from './Components/BubbleChart/BubbleChart';
import Homepage from './Components/Homepage/Homepage';
import Quiz from './Components/Quiz/Quiz';
import Form from './Components/Form/Form';
import Nav from './Components/Nav/Nav';
import CustomQs from './Components/CustomQs/CustomQs'

function App() {
  const [categories, setCategories] = useState([])
  const [selectedCatAndQuestions, setSelectedCatAndQuestions] = useState({})

  const url = 'http://localhost:3000'
  // const url = 'https://quiz-app-kr-backend.herokuapp.com'

  const getCategories = async () => {
      try{
        const response = await fetch(url + '/categories')
        const data = await response.json()
        console.log(data)
        setCategories(data)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    getCategories()
  }, [])

  
  const handleGetCatQuestions = async (category) => {
    console.log('handle get cat questions', category)
      try{
          const response = await fetch(url + '/categories/' + category.id)
          const data = await response.json()
          console.log('cat questions data', data)
          setSelectedCatAndQuestions(data)

      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    handleGetCatQuestions();
  }, [])

  return (
    <div className="App">
        <header>
          <Nav categories={categories} handleGetCatQuestions={handleGetCatQuestions}/>
        </header>
        <main>
          <Switch>
            <Route exact path='/' render={(rp) => (
                <Homepage {...rp}/>
            )}/>  
            
            <Route exact path='/quiz' render={(rp) => (
                <>
                  <Quiz {...rp} selectedCatAndQuestions={selectedCatAndQuestions} handleGetCatQuestions={handleGetCatQuestions} url={url}/>
                  <BubbleChart {...rp}/>
                </>
            )}/>
                
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
