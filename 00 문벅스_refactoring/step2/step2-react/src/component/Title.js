import styled from 'styled-components'

const Title = ({userTitle}) => {


  return (<UserTitle>{userTitle}'s work</UserTitle>)
}

const UserTitle = styled.h2`
  font-weight: bold;
  font-size: 30px;
  color: darkolivegreen;
  text-align: center;
`

export default Title