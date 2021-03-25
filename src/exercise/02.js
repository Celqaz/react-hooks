// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Cool Custom Hook
function useSyncState(key, defaultValue='') {
  // ||或运算，如果左侧为False，则返回右侧数据。
  // lazy state initialization
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue
  )
  
  React.useEffect(() => {
    // console.log(state)
    window.localStorage.setItem(key, state)
  },[key, state]) //Effect Dependency
  
  return [state,setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] =  useSyncState('name',initialName)
  console.log(name)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Frank" />
}

export default App
