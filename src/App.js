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
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})

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
  // need to add something to dependency so when category is clicked again, it fetches an updated list

  const handleSelectCategory = (category) => {
    console.log('handlegetquestion category', category)
    setSelectedCategory(category)
  
  }
  //onclick of category and next button, should fetch category questions again
  //call function to run fetch
  //or add a counter that is the useEffect dependency in the Quiz component


  return (
    <div className="App">
        <header>
          <Nav categories={categories} handleSelectCategory={handleSelectCategory}/>
        </header>
        <main>
          <Switch>
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route exact path='/quiz'>
                <Quiz selectedCategory={selectedCategory} url={url}/>
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
