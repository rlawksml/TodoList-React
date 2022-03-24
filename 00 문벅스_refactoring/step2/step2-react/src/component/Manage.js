import styled from 'styled-components'
import Title from './Title'
import CreateUserBtns from './CreateUserBtns'
import UserList from './UserList'
import TodoContainer from './TodoContainer'
import { useState, useRef } from 'react'
import TodoList from './TodoList'

// 유저와 todo 연결하기
// 로컬스토리지

const Manage = () => {


  let nextid = useRef(0)

  // const [userInfo, setUserInfo] = useState()
  const [userList, setUserList] = useState([])
  const [currentUser, setCurrentUser] = useState(0)
  const [currentUserValue, setCurrentUserValue] = useState("")

  const [userTitle, setUserTitle] = useState('Nobody')

  const createUser = (newuser) => {
    
    setUserList([...userList,  {id: nextid.current,name : newuser, active:false, todos:[]}])
    nextid.current += 1

    setCurrentUserValue(newuser)
  }

  const changeUserTitle = (data) => {
    setUserTitle(data)
  }

  const deleteUser = () => {
    setUserList(
        userList.filter(filterUser =>{
              return filterUser.id !== Number(currentUser)
            }
        )
      )
  }

  const handleTodoItem = (data) => {
    // console.log(data)
    // console.log(userList[currentUser].name === currentUserValue)
    
    setUserList(userList.map( user => { 
      return user.name !== currentUserValue ? user : {...user, todos: data}
    }
      )
      )
    }

  return (
  <>
  <Title userTitle={userTitle} />
  <CreateUserBtns onCreateUser={createUser} onDeleteUser={deleteUser}></CreateUserBtns>
  <UserList changeUserTitle={changeUserTitle} users={userList} setCurrentUser={setCurrentUser} setCurrentUserValue={setCurrentUserValue}/>
  <TodoContainer currentUser={currentUser} handleTodoItem={handleTodoItem} users={userList} setUsers={setUserList}/>
  </>
  )
}




export default Manage