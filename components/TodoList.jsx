import { List } from 'antd'
import Todo from './Todo'
import React from 'react'

// @ts-ignore
const TodoList = React.memo(({ todoList }) => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={todoList}
        renderItem={(todo) => <Todo key={todo.id} todo={todo} />}
      />
    </>
  )
})

export default TodoList
