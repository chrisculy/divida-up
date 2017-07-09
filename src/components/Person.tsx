import * as React from 'react'

const Person: React.StatelessComponent<{ name: string }> = props => (
  <div>{props.name}</div>
)

export default Person
