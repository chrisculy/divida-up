import * as React from 'react'

const Root: React.StatelessComponent<{}> = props => {
  return (
    <div className='container'>
      <h2>divida-up</h2>
      <div className='jumbotron col-lg-12'>
        {props.children}
      </div>
    </div>
  )
}

export default Root
