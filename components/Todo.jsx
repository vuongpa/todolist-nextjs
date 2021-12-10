import { Button, Input } from 'antd'
import { useState, useRef } from 'react'
import { EditTwoTone, CheckSquareTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import { checkedTodo, editTodo } from '../redux/actions/todoList'
import { useDispatch } from 'react-redux'
import React from 'react'
//css
// @ts-ignore
import styles from './todo.module.css'

// @ts-ignore
const Todo = React.memo(({ todo }) => {
  //useRef
  const inputRef = useRef(null)
  //state
  const [edit, setEdit] = useState(false)
  const [input, setInput] = useState(() => todo.name)

  // dispatch
  const dispatch = useDispatch()

  const onClickEdit = (todo) => {
    if (edit) {
      inputRef.current.blur()
      const newTodo = { ...todo, name: input }
      const action = editTodo(newTodo)
      dispatch(action)
    }
    if (!edit) {
      inputRef.current.focus()
    }
    setEdit(!edit)
  }

  const onClickChecked = (todo) => {
    const action = checkedTodo(todo)
    dispatch(action)
  }

  const isCompleted = {
    color: '#d6d6d6',
    textDecoration: 'line-through',
  }

  return (
    <li className={styles.todo}>
      <Input.Group className={styles.input_group}>
        <Input
          className={edit ? '' : styles.input_nonedit}
          style={todo.isCompleted ? isCompleted : {}}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />
        <Button
          onClick={() => onClickEdit(todo)}
          type="text"
          icon={!edit ? <EditTwoTone /> : <CheckCircleTwoTone />}
        />
        <Button onClick={() => onClickChecked(todo)} type="text" icon={<CheckSquareTwoTone />} />
      </Input.Group>
    </li>
  )
})
export default Todo
