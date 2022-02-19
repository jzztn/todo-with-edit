import { useState } from 'react'

const Todo = ({ todo, dispatch, ACTION }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState('')

  const handleDeleteTodo = () => {
    dispatch({ type: ACTION.DELETE_TODO, payload: { id: todo.id } })
  }

  const handleComplete = () => {
    dispatch({ type: ACTION.COMPLETE_TODO, payload: { id: todo.id } })
  }

  const handleIncomplete = () => {
    dispatch({ type: ACTION.INCOMPLETE_TODO, payload: { id: todo.id } })
  }

  const handleEditValue = (e) => {
    e.preventDefault()

    if(editValue !== '') {
      dispatch({ type: ACTION.EDIT_TODO, payload: {id: todo.id , message: editValue} })
    }

    setIsEdit(false)
  }

  const handleEdit = () => {
    if(isEdit) return setIsEdit(false)
    else if (!isEdit) return setIsEdit(true)
  }


  
  return (
    <div>
      {isEdit ? (
        <form onSubmit={handleEditValue}>
          <input
            type='text'
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </form>
      ) : (
        <div>{todo.message}</div>
      )}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleComplete}>Complete</button>
      <button onClick={handleIncomplete}>Incomplete</button>
      <button onClick={handleDeleteTodo}>Delete</button>
    </div>
  )
}

export default Todo
