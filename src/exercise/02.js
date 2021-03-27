// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Cool Custom Hook
function useSyncState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  // ||或运算，如果左侧为False，则返回右侧数据。
  // lazy state initialization
  const [state, setState] = React.useState(() => {
    const valueInstorage = window.localStorage.getItem(key)
    // console.log(key, valueInstorage)
    if (valueInstorage) {
      // JSON.parse()方法将数据转换为JavaScript对象。
      // valueInstorage此时为字符串，
      // const att = JSON.parse(valueInstorage)
      // return valueInstorage
      return deserialize(valueInstorage)
    }
    // give the feature to create the function that create the defaultValue dynamic
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const preKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = preKeyRef.current
    if (prevKey != key) {
      window.localStorage.removeItem(prevKey)
    }
    preKeyRef.current = key
    // JSON.stringify() 方法将 JavaScript 对象转换为字符串
    window.localStorage.setItem(key, serialize(state))
    // window.localStorage.setItem(key, state)
  }, [key, serialize, state]) //Effect Dependency

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useSyncState('name', initialName)
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
