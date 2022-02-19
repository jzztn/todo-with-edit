import { useEffect, useReducer, useState } from 'react'
import Todo from '../components/Todo'

const ACTION = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo', 
  COMPLETE_TODO: 'complete-todo',
  INCOMPLETE_TODO: 'incomplete-todo',
  EDIT_TODO: 'edit-todo'
}

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return [...todos, newTodo(action.payload.id, action.payload.message)]

    case ACTION.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id)

    case ACTION.COMPLETE_TODO:
      return todos.map((todo) => {
        if(todo.id === action.payload.id) {
          return {
            ...todo,
            isComplete:true
          }          
        }
        return todo
      })

    case ACTION.INCOMPLETE_TODO:
      return todos.map((todo) => {
        if(todo.id === action.payload.id) {
          if(todo.isComplete) {
            return {
              ...todo,
              isComplete:false
            }  
          }      
        }
        return todo
      })

    case ACTION.EDIT_TODO: 
      return todos.map((todo) => {
        if(todo.id === action.payload.id) {
          return {
            ...todo,
            message:action.payload.message
          }    
        }
        return todo
      })

    default: 
      return todos
  }
}

const newTodo = (id, message) => {
  return { id: id, message: message, isComplete: false}
}


const Home = () => {
  const [todos, dispatch] = useReducer(reducer, [])
  const [input, setInput] = useState('')

  const id = Math.floor(Math.random() * 10000000)

  useEffect(() => {
    console.log('im activated')
  },[todos])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(input !== '') {
      dispatch({type: ACTION.ADD_TODO, payload: {id:id, message:input}})
      setInput('')
    }
  }

  console.log(todos)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Type here'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} ACTION={ACTION}/>
        ))}
      </div>
    </div>
  )
}

export default Home
