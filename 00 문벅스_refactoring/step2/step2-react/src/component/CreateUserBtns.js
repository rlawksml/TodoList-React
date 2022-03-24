import styled from "styled-components";


const CreateUserBtns = ({onCreateUser, onDeleteUser}) => {

  const handleCreateUser = () => {
    const newUser = prompt('새로운 유저 이름 입력')
    if(newUser){
      onCreateUser(newUser)
    }

  }
  
  const handleDeleteUser = (e) => {
    onDeleteUser()
  } 

  return(
    <ButtonContainer>
      <CreateUserBtn onClick={handleCreateUser}>유저 생성</CreateUserBtn>
      <DeleteUserBtn onClick={handleDeleteUser}>유저 삭제</DeleteUserBtn>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`


const CreateUserBtn = styled.button`
  font-size: 15px;
  font-weight: bold;
  color: azure;
  background-color: darkcyan;
  border: none;
  border-radius: 20px 0 0 20px;
  padding: 10px 20px;

  &:hover{
    opacity: 0.7;
    cursor: pointer;
  }
`

const DeleteUserBtn = styled.button`
  font-size: 15px;
  font-weight: bold;
  color: azure;
  background-color: darkgoldenrod;
  border: none;
  border-radius: 0 20px 20px 0;
  padding: 10px 20px;

  &:hover{
    opacity: 0.7;
    cursor: pointer;
  }
`


export default CreateUserBtns