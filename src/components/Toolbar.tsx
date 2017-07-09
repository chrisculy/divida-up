import * as React from 'react'

export interface ToolbarProps {
  buttons: JSX.Element[]
  style: React.CSSProperties
}

const Toolbar: React.StatelessComponent<ToolbarProps> = (props) => (
  <div className='col-xs-12 btn-group' role='group' style={props.style}>
    {props.buttons}
  </div>
)

export default Toolbar
