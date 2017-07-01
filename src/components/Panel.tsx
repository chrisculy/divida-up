import * as React from 'react'

const Panel: React.StatelessComponent<{ title: string }> = props => {
  return (
    <div className='panel panel-primary'>
      <div className='panel-heading'>{props.title}</div>
      <div className='panel-body'>
        {props.children}
      </div>
    </div>
  )
}

export default Panel
