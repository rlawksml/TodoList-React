import { useRef, useState } from "react";
import styled from "styled-components";
import TodoFooter from "./TodoFooter";
import TodoForm from "./TodoForm";
import TodoList from './TodoList'

const TodoContainer = ({handleTodoItem, users, setUsers, currentUser}) => {

  let nextid = useRef(0)
  const [todoItems, setTodoItems] = useState([])

  const onDeleteItem = (data) => {
    setTodoItems(
        todoItems.filter(item => {
          return item.id !== Number(data)
        })
    )
  }

  const onUpdateItem = (data) => {
    const updatedItem = prompt('수정하실 할일을 입력해주세요', todoItems[data].todo)
    setTodoItems(
      todoItems.map(item => {
        return item.id !== Number(data) ? {...item} : {...item, todo : updatedItem}
      })
    )
  }

  const onCompletedItem = (data) => {
    setTodoItems(
      todoItems.map(item => {
        return item.id === Number(data) ? {...item, completed : !item.completed} : {...item}
      })      
    )
  }

  const addTodoItem = (data) => {


    // handleTodoItem({
    //   todo : data, id: nextid.current, completed : false
    // })


    setTodoItems(
      [...todoItems, {
        todo : data, id: nextid.current, completed : false
      }]
    )

    handleTodoItem(todoItems)
    nextid.current += 1
  }

  return (
  <TodoContainerStyled>
    <TodoForm onCreate={addTodoItem}/>
    <TodoList currentUser={currentUser} users={users} onCompletedItem={onCompletedItem} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} todoItems={todoItems}/>
    <TodoFooter/>
  </TodoContainerStyled>
  )
}

const TodoContainerStyled = styled.div`
  background-color: gainsboro;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
`


export default TodoContainer