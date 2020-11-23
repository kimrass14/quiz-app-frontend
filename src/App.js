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

  const emptyForm = {
    name: '',
    created: '',
    questions: [
      {
        quiz_question: '',
        correct_answer: '',
        incorrect_answer_1: '',
        incorrect_answer_2: '',
        incorrect_answer_3: '',
        category_id: '',
        user_answer: ''
      }
    ]
  }

  const [selectedQuestion, setSelectedQuestion] = useState(emptyForm)
  const selectQuestion = (question) => {
    setSelectedQuestion(question)
  }

  const handleCreate = async (newItem) => {
      try{
        const category = await fetch(url + '/categories/', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItem)
        })
        const response = await category.json()
        getCategories()
        console.log('handleCreate newitem', response)
      } catch (error) {
        console.log(error)
      }
  }

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

  //CAUSING TOO MANY RE-RENDERS?? DON'T UNDERSTAND BC USING USEEFFECT WHICH SHOULD PREVENT THIS
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
                
            <Route exact path='/customquestion' render={(rp) => (
                <Form {...rp} selectedQuestion={selectedQuestion} handleSubmit={handleCreate}/>
            )}/>
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
