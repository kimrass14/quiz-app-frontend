import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.scss';
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

  const catToUpdateQuestion = (category) => {
    setCreatedCategory(category)
  }

  const handleSubmitCatToQ = (category) => {
    console.log('app handle submit - category obj', category)
    setCreatedCategory(category)
  }

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

 

  

  // const url = 'http://localhost:3000'
  const url = 'https://quiz-app-kr-backend.herokuapp.com'
  

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
        console.log('get categories', data)
        //onclick of next button, returning updated data with user_answer = correct
        setCategories(data)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleGetCatQuestions = async (category) => {
    
      try{
          const response = await fetch(url + '/categories/' + category.id)
          const data = await response.json()
          console.log('cat questions data', data)
          setSelectedCatAndQuestions(data)

      } catch (error) {
        console.log(error)
      }
  }

  
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
        getCategories()
        // setCreatedCategory(response)
        console.log('handleUpdate category', response)
      } catch (error) {
        console.log(error)
      }
  }

  const handleUpdateQuestion = async (question, questionBeforeUpdate) => {
    console.log('handleupdate question', question)
    console.log('handleupdate question', questionBeforeUpdate)
      try{
          const updatedQuestion = await fetch(url + '/categories/' + question.category_id + '/questions/' + question.id, {
          method: 'put',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(question)
        })
        const response = await updatedQuestion.json()

        if(question.user_answer === questionBeforeUpdate.user_answer) {
          getCategories()
        }

        //Conditional for calling getCategories: 
        //Both actions of updating question from View and when correct answer is selected by user
        //calls this handleUpdateQuestion function
        //However, calling getCategories renders a new question in the quiz just by user selecting the correct answer instead of when Next button is selected

        console.log('handleUpdate question', response)
      } catch (error) {
        console.log(error)
      }
  }

    const handleDeleteCategory = (category) => {
      
      fetch(url + '/categories/' + category.id, {
        method: 'delete',
      }).then((response) => getCategories());
    };

    const handleDeleteQs = (question) => {
      fetch(url + '/categories/' + question.category_id + '/questions/' + question.id, {
        method: 'delete',
      }).then((response) => getCategories());
    };

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
                <div className="quiz-route">
                  {"name" in selectedCatAndQuestions ? 
                    <Quiz {...rp} selectedCatAndQuestions={selectedCatAndQuestions} handleGetCatQuestions={handleGetCatQuestions} url={url} getCategories={getCategories} /> :
                    <div className="select-cat">Select a category</div>}
                  <BubbleData {...rp} categories={categories} />
                </div>
            )}/>
                
            <Route exact path='/customcategory' render={(rp) => (
                <CategoryForm {...rp} selectedCategory={selectedCategory} handleSubmit={handleCreateCategory} categories={categories} handleSubmitCatToQ={handleSubmitCatToQ} label="Add" route="/customquestion"/>
            )}/>
            <Route exact path='/customquestion' render={(rp) => (
                <QuestionForm {...rp} selectedQuestion={selectedQuestion} handleSubmit={handleCreateQuestion} createdCategory={createdCategory} label="Add"/>
            )}/>
            <Route exact path='/editcategory' render={(rp) => (
                <CategoryForm {...rp} selectedCategory={selectedCategory} handleSubmit={handleUpdateCategory} label="Update" route="/editcategory"/>
            )}/>
            <Route exact path='/editquestion' render={(rp) => (
                <QuestionForm {...rp} selectedQuestion={selectedQuestion} handleSubmit={handleUpdateQuestion} createdCategory={createdCategory} label="Update"/>
            )}/>
            <Route exact path='/customlist' render={(rp) => (
                <CustomList {...rp} categories={categories} selectCategory={selectCategory} catToUpdateQuestion={catToUpdateQuestion} selectQuestion={selectQuestion} handleDelete={handleDeleteCategory} handleDeleteQs={handleDeleteQs} />
            )}/>
          </Switch>
        </main>
    </div>
  );
}

export default App;
