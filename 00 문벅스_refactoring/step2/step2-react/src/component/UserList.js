import { useState } from "react";
import styled from "styled-components";


const UserList = ({users, setCurrentUser, changeUserTitle, setCurrentUserValue}) => {
  const clickedUser = (e) => {
    const {id} = e.target
    setCurrentUser(id)
    
    setCurrentUserValue(e.target.innerText)

    let liactives = e.target.closest('ul').querySelectorAll('li')

    liactives = Array.from(liactives)
    liactives.map(item => 
      item.classList.remove('active'))

    e.target.classList.add('active')

    changeUserTitle(e.target.innerText) 
  }

  return(
  <UserListContainer>
    {
      users.map((user,index) => <User key={user.name + index} id={user.id} onClick={clickedUser}>{user.name}</User>)
    }
  </UserListContainer>
  )
}


const UserListContainer = styled.ul`
  width: 100%;
  margin: 0;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const User = styled.li`
  list-style: none;
  padding: 10px 25px;
  margin: 0 5px;
  color: sandybrown;
  font-weight: bold;
  border: 1px solid blueviolet;
  border-radius: 20px;

  &:hover{
    cursor: pointer;
    opacity: 0.6;
  }
  &.active{
    background-color: blueviolet;
  }
`

export default UserList