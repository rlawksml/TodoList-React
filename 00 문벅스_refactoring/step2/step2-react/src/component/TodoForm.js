import styled from "styled-components";
import TodoFooter from "./TodoFooter";

const TodoForm = ({onCreate}) => {

  const handleCreaate = (e) => {

    e.preventDefault()
    const newTodoitem = (e.target.querySelector('input').value) 
    onCreate(newTodoitem)

    e.target.querySelector('input').value = ""
  }

  return (
  <>
    <TodoFormTag onSubmit={handleCreaate}>
      <TodoInput placeholder="할일 입력하기"/>
    </TodoFormTag>
  </> )
}

const TodoFormTag = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const TodoInput = styled.input`
padding: 0 20px;
  width: 50%;
  height: 25px;
  margin: 0 auto;
  border-radius: 5px;
  outline: none;
  border: none;
`

export default TodoForm;