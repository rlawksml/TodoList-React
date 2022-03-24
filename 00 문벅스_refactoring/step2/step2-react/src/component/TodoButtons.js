import styled from "styled-components";


const TodoButtons = ({onDelete, onUpdate, onCompleted}) => {

  const handleDeleteItem = (e) => {
    onDelete(e.target.closest('li').id)
  }

  const handleUpdateItem = (e) => {
    onUpdate(e.target.closest('li').id)
  }

  const handleCompleteItem = (e) => {
    onCompleted(e.target.closest('li').id)
  }

  return(
    <ButtonContainer>
      <DeleteBtn onClick={handleDeleteItem}>삭제
      </DeleteBtn>
      <UpdateBtn onClick={handleUpdateItem}>수정
      </UpdateBtn>
      <CompleteBtn onClick={handleCompleteItem}>완료
      </CompleteBtn>
    </ButtonContainer>
  )

}


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-left : auto;
  padding: 0;
`

const DeleteBtn = styled.button`
  border-radius: 5px;
  padding: 0 10px;
  color: white;
  background-color: lightcoral;
  border: none;
  margin: 0 5px;
  &:hover{
    opacity: 0.7;
    cursor: pointer;
  }
`
const UpdateBtn = styled.button`
  border-radius: 5px;
  padding: 0 10px;
  color: white;
  background-color: lightcoral;
  border: none;
  margin: 0 5px;
  &:hover{
    opacity: 0.7;
        cursor: pointer;
  }
`

const CompleteBtn = styled.button`
  border-radius: 5px;
  padding: 0 10px;
  color: white;
  background-color: lightcoral;
  border: none;
  margin: 0 5px;
  &:hover{
    opacity: 0.7;
        cursor: pointer;
  }
`


export default TodoButtons