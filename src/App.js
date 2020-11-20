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
  
  // const getCategories = () => {
	// 	fetch(url + '/categories')
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log('data', data)
	// 			// setCategories(data);
	// 		});
	// };
	// useEffect(() => {
	// 	getCategories()
  //   }, []);

  const handleSelectCategory = (category) => {
    console.log('handlegetquestion category', category)
    setSelectedCategory(category)
    // return(
    //   <div>question</div>
    // )
  }


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
                <Quiz selectedCategory={selectedCategory}/>
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
