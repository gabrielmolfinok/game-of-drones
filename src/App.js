import React from 'react'
import Topbar from './components/Topbar'

const App = (props) => {
  return (
    <div>

        <Topbar />
        
        { props.children }

    </div>
  )
}

export default App



