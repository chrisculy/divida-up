import * as React from 'react'
import Person from '../../models/Person'

const PersonView: React.StatelessComponent<{ person: Person }> = props => (
  <div>{props.person.name}</div>
)

export default PersonView
