import { Layout, Typography, Input, Button, notification } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import { addTodo, clearTodoCompleted } from '../redux/actions/todoList'
import TodoList from '../components/TodoList'
// @ts-ignore
import styles from './index.module.css'

const { Content, Sider, Header, Footer } = Layout
const { Title } = Typography

const Home = () => {
  // State
  const [todoName, setTodoName] = useState('')

  // redux handle
  // @ts-ignore
  const todoList = useSelector((state) => state.todoList.list)
  const dispatch = useDispatch()

  // localStorage
  useEffect(() => {
    const storageTodoList = localStorage.getItem('TODO_APP')
    if (storageTodoList) {
      JSON.parse(storageTodoList).forEach((todo) => {
        const action = addTodo(todo)
        dispatch(action)
      })
    }
  }, [])

  useEffect(() => {
    if (todoList) {
      localStorage.setItem('TODO_APP', JSON.stringify(todoList))
    }
  }, [todoList])

  //config
  const inputElement = useRef(null)

  // notification
  const openNotification = (type, content) => {
    const config = {
      message: `${type} Notification`,
      description: content,
      duration: 2,
    }
    notification[type](config)
  }

  //Handled event
  const onAddTodo = () => {
    const action = addTodo({
      name: todoName,
      isCompleted: false,
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    })
    dispatch(action)
    openNotification('success', 'Successfully insert new job')
    inputElement.current.focus()
    setTodoName('')
  }

  const onClickClearCompleted = () => {
    console.log(todoList.filter((item) => !item.isCompleted))
    const action = clearTodoCompleted()
    dispatch(action)
  }

  return (
    <div className={styles.container}>
      <Title>Todo List with nextjs</Title>
      <Layout className={styles.layout}>
        <Content>
          <Input.Group className={styles.input_group}>
            <Input
              placeholder="Add todo..."
              value={todoName}
              className={'input'}
              onChange={(e) => setTodoName(e.target.value)}
              ref={inputElement}
            />
            <Button type="primary" onClick={onAddTodo} disabled={!todoName}>
              ADD
            </Button>
          </Input.Group>
        </Content>
      </Layout>
      <Layout className={styles.layout}>
        <Content>
          <TodoList todoList={todoList} />
        </Content>
      </Layout>
      <Button
        onClick={onClickClearCompleted}
        danger
        type="primary"
        disabled={!todoList.filter((todo) => todo.isCompleted).length}
      >
        <DeleteFilled />
        Clear Todo Completed
      </Button>
    </div>
  )
}

export default Home
