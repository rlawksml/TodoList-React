import styled from 'styled-components'
import Manage from "./component/Manage";

function App() {

  return (
    <div className="App">
      <Container>
        <Manage/>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  align-content: center;
`


export default App;
