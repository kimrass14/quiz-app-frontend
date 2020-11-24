import React, {useState, useEffect} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.scss';
import BubbleChart from './Components/BubbleChart/BubbleChart';
import Homepage from './Components/Homepage/Homepage';
import Quiz from './Components/Quiz/Quiz';
import CategoryForm from './Components/CategoryForm/CategoryForm';
import Nav from './Components/Nav/Nav';
import CustomList from './Components/CustomList/CustomList'
import QuestionForm from './Components/QuestionForm/QuestionForm';
import BubbleData from './Components/BubbleData/BubbleData';

function App() {
  const [categories, setCategories] = useState([])
  const [selectedCatAndQuestions, setSelectedCatAndQuestions] = useState({})
  const [createdCategory, setCreatedCategory] = useState({})

  const emptyCategory = {
    name: '',
    created: ''
  }
  const [selectedCategory, setSelectedCategory] = useState(emptyCategory)
  const selectCategory = (category) => {
    setSelectedCategory(category)
  }

  const emptyQuestion =
      {
        quiz_question: '',
        correct_answer: '',
        incorrect_answer_1: '',
        incorrect_answer_2: '',
        incorrect_answer_3: '',
        category_id: '',
        user_answer: ''
      }
  const [selectedQuestion, setSelectedQuestion] = useState(emptyQuestion)
  const selectQuestion = (question) => {
    setSelectedQuestion(question)
  }

  const url = 'http://localhost:3000'
  // const url = 'https://quiz-app-kr-backend.herokuapp.com'
  

  const handleCreateCategory = async (newItem) => {
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
        setCreatedCategory(response)
        console.log('handleCreate category', response)
      } catch (error) {
        console.log(error)
      }
  }

  const handleCreateQuestion = async (newItem) => {
      try{
          const question = await fetch(url + '/categories/' + newItem.category_id + '/questions', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItem)
        })
        const response = await question.json()
        getCategories()
        console.log('handleCreate question', response)
      } catch (error) {
        console.log(error)
      }
  }

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
  
  const handleUpdateCategory = async (category) => {
      try{
          const updatedCategory = await fetch(url + '/categories/' + category.id, {
          method: 'put',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(category)
        })
        const response = await updatedCategory.json()
        // getCategories()
        // setCreatedCategory(response)
        console.log('handleUpdate category', response)
      } catch (error) {
        console.log(error)
      }
  }

    const handleDeleteCategory = async (category) => {
        console.log('handle delete params', url + '/categories/' + category.id)
        try {
            const deletedCategory = await fetch(url + '/categories/' + category.id, {
            method: 'delete',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(category)
          })
          const response = await deletedCategory.json()
          console.log('handleDelete category', response)
          getCategories()
        } catch (error) {
          console.log(error)
        }
    }

    const handleDeleteQs = async (question) => {
        console.log('delete Q params', question)
        try {
            const deletedQuestion = await fetch(url + '/categories/' + question.category_id + '/questions/' + question.id, {
            method: 'delete',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(category)
          })
          const response = await deletedQuestion.json()
          console.log('handleDelete question', response)
          getCategories()
        } catch (error) {
          console.log(error)
        }
    }

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
                  <BubbleData {...rp}/>
                </>
            )}/>
                
            <Route exact path='/customcategory' render={(rp) => (
                <CategoryForm {...rp} selectedCategory={selectedCategory} handleSubmit={handleCreateCategory} categories={categories} label="Add" route="/customquestion"/>
            )}/>
            <Route exact path='/customquestion' render={(rp) => (
                <QuestionForm {...rp} selectedQuestion={selectedQuestion} handleSubmit={handleCreateQuestion} createdCategory={createdCategory} label="Add"/>
            )}/>
            <Route exact path='/editcategory' render={(rp) => (
                <CategoryForm {...rp} selectedCategory={selectedCategory} handleSubmit={handleUpdateCategory} label="Update" route="/editcategory"/>
            )}/>
            <Route exact path='/customlist' render={(rp) => (
                <CustomList {...rp} categories={categories} selectCategory={selectCategory} handleDelete={handleDeleteCategory} handleDeleteQs={handleDeleteQs}/>
            )}/>
          </Switch>
        </main>
    </div>
  );
}

export default App;
