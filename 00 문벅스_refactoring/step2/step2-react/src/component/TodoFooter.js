import styled from "styled-components";

const TodoFooter = () => {

  return (
  <TodoFooterUl>
    <TodoFooterItem>오늘 할 일</TodoFooterItem>
    <TodoFooterItem>전체보기</TodoFooterItem>
    <TodoFooterItem>남은 할 일</TodoFooterItem>
    <TodoFooterItem>완료 한 일</TodoFooterItem>
  </TodoFooterUl>
  )
}
const TodoFooterUl = styled.ul`
  display: flex;
  justify-content: center;
  align-content: center;
  border-top: 1px solid lightgray;
  margin: 0;
  padding: 0;
`

const TodoFooterItem = styled.li`
  list-style: none;
  margin: 10px;
  background-color : lightcoral;
  padding: 3px 10px;
  color: aliceblue;
  font-weight: bold;
  border-radius: 10px;
  &:hover{
    cursor: pointer;
    opacity: 0.7;
  }

`

export default TodoFooter