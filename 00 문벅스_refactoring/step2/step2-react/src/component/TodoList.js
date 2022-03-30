import { useState } from "react";
import styled from "styled-components";
import TodoButtons from "./TodoButtons";

const TodoList = ({users, currentUser, todoItems, onDeleteItem, onUpdateItem, onCompletedItem}) => {

  const curTodos = (users.filter(item => 
    {return item.id=== Number(currentUser) ? item : null}))

    let todos
    todos = (curTodos.length > 0 && curTodos[0].todos)

  return (
  <TodoListDiv>
    {todos.length > 0 &&
      (todos.map(
        (item)=>
        <TodoListItem className={item.completed ? "completed" : null} key={item.id} id={item.id}>
            {item.todo}

          <TodoButtons onUpdate={onUpdateItem} onDelete={onDeleteItem} onCompleted={onCompletedItem}/>

        </TodoListItem>
      ))
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