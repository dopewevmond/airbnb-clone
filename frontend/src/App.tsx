import styled from 'styled-components'

const Button = styled.button`
  background-color: red;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`

function App() {
  return (
    <div className="App">
        <Button>Click me</Button>
    </div>
  );
}

export default App;
