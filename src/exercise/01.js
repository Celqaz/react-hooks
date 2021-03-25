// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName=''}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [username,setusername] = React.useState(initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setusername(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" defaultValue={username}/>
      </form>
      {username ? <strong>Hello {username}</strong> : 'Please type your name' }
    </div>
  )
}

function App() {
  return <Greeting initialName='React is awesome'/>
}

export default App
