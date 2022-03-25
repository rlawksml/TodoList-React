import { useState } from "react";
import styled from "styled-components";
import TodoButtons from "./TodoButtons";

const TodoList = ({users, currentUser, todoItems, onDeleteItem, onUpdateItem, onCompletedItem}) => {

  // const [currentUser , setCurrentUser] = useState()

  const [currentTodos, setCurrentTodos] = useState(
    users.map(item => item.todos)
    )

  console.log(currentTodos)
  // console.clear()
  console.log(currentUser ,'출력')
  // users의 todos만 뽑아내기
  console.log(users.map(item => item))
  const curTodos = (users.filter(item => 
    {return item.id=== Number(currentUser) ? item : null}))

  console.log(curTodos[0].todos)
  

  // if(users.length>0){
  //   console.log(users.length)
  //   console.log(currentTodos)
  // }



  return (
  <TodoListDiv>
    {
      // array[0].map(
      //   (item)=>
      //   <TodoListItem className={item.completed ? "completed" : null} key={item.id} id={item.id}>
      //       {item.todo}

      //     <TodoButtons onUpdate={onUpdateItem} onDelete={onDeleteItem} onCompleted={onCompletedItem}/>

      //   </TodoListItem>
      // )
    }
  </TodoListDiv>
  )
}

const TodoListDiv = styled.ul`
  padding : 0;
  margin: 0;
  border-top: 1px solid lightslategray;
  border-bottom: 1px solid lightslategray;
`

const TodoListItem = styled.li`
  list-style: none;
  padding: 15px 20px;
  font-weight: bold;
  font-size: 20px;
  color: darkolivegreen;
  display: flex;

  border-bottom: 1px dashed lightslategray;
  &:last-child{
    border-bottom:none;
  }
  &.completed{
    background-color: greenyellow;
    color: black;
  }
`

export default TodoList