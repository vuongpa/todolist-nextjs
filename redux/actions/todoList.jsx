export const addTodo = (todoList) => {
  return {
    type: 'ADD_TODO',
    payload: todoList,
  }
}

export const editTodo = (todoList) => {
  return {
    type: 'EDIT_TODO',
    payload: todoList,
  }
}

export const clearTodoCompleted = () => {
  return {
    type: 'CLEAR_TODO_COMPLETED',
  }
}

export const checkedTodo = (todoList) => {
  return {
    type: 'CHECKED_TODO',
    payload: todoList,
  }
}
