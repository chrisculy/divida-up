import * as React from 'react'

const App: React.StatelessComponent<{ title: string }> = props => {
  return (
    <div className='container'>
      <h2>{props.title}</h2>
      <div className='jumbotron col-lg-12'>
        {props.children}
      </div>
    </div>
  )
}

export default App
