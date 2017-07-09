import * as React from 'react'
import Person from '../../models/Person'

export interface PersonEditProps {
  person: Person
  saveName: (name: string) => void
  save: () => void
  saveLabel: JSX.Element
}

const PersonEdit: React.StatelessComponent<PersonEditProps> = (props) => (
  <div>
    <input
      type='text'
      className='form-control'
      value={props.person.name}
      onChange={(e) => props.saveName(e.target.value)}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          props.save()
        }
      }}></input>
    <button type='button' className='btn btn-default' onClick={ _ => props.save()}>
      {props.saveLabel}
    </button>
  </div>
)

export default PersonEdit
