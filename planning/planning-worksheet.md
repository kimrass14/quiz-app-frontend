# Project Overview


## Project Description

- Intended user: student or anyone wanting to learn or improve their knowledge on a topic
- An app that generates multiple choice questions by certain categories. As the user answers each question it updates a D3 bubble chart that visualizes the number of questions correct by category. Each category is its own bubble and with each correct answer the bubble increases in size.
- User can create their own category and add their own questions to help study a topic or for an exam

## API

Seeded data - aggregation of questions from various sources

## Wireframes

- [Mobile wireframes](https://www.canva.com/design/DAEN9zsMuoA/rQ81ksBgnABtAkI2IUU9Vg/view?utm_content=DAEN9zsMuoA&utm_campaign=designshare&utm_medium=link&utm_source=homepage_design_menu)
- [Desktop wireframe](https://www.canva.com/design/DAEN93VxrXc/SR64zrejS7Hx5Oy9x6rWYA/view?utm_content=DAEN93VxrXc&utm_campaign=designshare&utm_medium=link&utm_source=homepage_design_menu)
- [Architecture](https://docs.google.com/drawings/d/1trMYSQpGBmPIj6NB9T2gmeL203N6pTB2q5oI3vRYDWE/edit?usp=sharing) 

#### MVP

- deploy backend to heroku
- deploy frontend to netlify
- Seed quiz questions
- Render list of categories and multiple choice question
- Dynamic bubble chart
- Form to create quiz questions
- Form to update quiz questions
- Page to display user created questions
- Make mobile first and responsive

#### PostMVP

- Auth signup / login / demo account
- create form - customize multiple choice, true / false or flashcard

## User Stories

- Choose from a list of categories, which questions to answer
- Randomly generated multiple choice questions show one at a time
- User selects answer to question
- If answer is correct: selected button turns green, message appears "Correct!" and bubble in chart for that category increases in size
- If answer is incorrect: selected button turns red, message appears "Sorry, wrong answer", and bubble in chart for that category decreases in size
- Select "Next" button to go to the next question
- User can add their own study questions to a custom category
- User inputs question, multiple choice, answer and custom category
- Creates new category in nav to select from
- User can edit user created questions
- User can delete user created questions
- User can view custom created questions on another page to edit / delete

## Timeline

|  Description  |  Priority  |  Estimated Time  |  Actual Time  |
|  ---  |  :---:  |   :---:  |  :---:  |
| Create Rails backend with basic setup and seed trial data | high | 0.5 | 0 |
| Deploy backend | high | 1 | 0 |
| Create React app with basic setup and hello world component | high | 0.5 | 0 |
| Deploy frontend | high | 1 | 0 |
| Rails migration tables, model, controller, seed full data, test routes | high | 1.5 | 0 |
| Homepage | Medium | 1 | 0 |
| Navigation / header | high | 2 | 0 |
| Main page - rendering one question onclick of category or next button | high | 2 | 0 |
| Multple choice functionality - results of correct answer and incorrect answer | high | 2 | 0 |
| D3 bubble chart | high | 3 | 0 |
| Connecting chart to correct / incorrect data to be dynamic | high | 2 | 0 |
| Create / update form | Medium | 1.5 | 0 |
| Page of user created questions | Medium | 1.5 | 0 |
| Responsiveness | high | 3 | 0 |
| Styling | Medium | 5 | 0 |
| Debugging | high | 3 | 0 |
| Documentation | high | 1 | 0 |
| TOTAL | H | 31.5 | 0 |

## Additional Libraries
  - Bootstrap: dropdown menu in nav bar to select different categories

## Code Snippet

```

```
