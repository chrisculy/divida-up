import * as React from 'react'
import Person from '../../models/Person'
import PersonEdit from './PersonEdit'
import PersonView from './PersonView'
import ItemExplorer from '../ItemExplorer'

export interface PersonEditorProps {
}

interface PersonEditorState {
  persons: Person[]
  currentPerson: Person
  currentPersonIndex: number | null
  newPerson: Person
  mode: 'create' | 'edit' | 'view'
}

export default class PersonEditor extends React.Component<PersonEditorProps, PersonEditorState> {
  constructor (props: PersonEditorProps) {
    super(props)
    this.state = {
      persons: [
        new Person('Thomas'),
        new Person('Benjamin'),
        new Person('Margaret'),
        new Person('Phoebe')
      ],
      currentPerson: new Person(),
      currentPersonIndex: null,
      newPerson: new Person(),
      mode: 'view'
    }
  }

  setMode (mode: 'create' | 'edit' | 'view') {
    this.setState({ ...this.state, mode: mode })
  }

  setCurrentPersonIndex (index: number) {
    if (this.state.currentPersonIndex !== index) {
      this.setState({ ...this.state, currentPerson: { ...this.state.persons[index] }, currentPersonIndex: index, mode: 'view' })
    }
  }

  saveCurrentPersonName (name: string) {
    this.setState({ ...this.state, currentPerson: { ...this.state.currentPerson, name: name } })
  }

  saveCurrentPerson () {
    if (this.state.currentPersonIndex !== null) {
      let state = { ...this.state }
      state.persons[this.state.currentPersonIndex] = state.currentPerson
      state.mode = 'view'
      this.setState(state)
    }
  }

  saveNewPersonName (name: string) {
    this.setState({ ...this.state, newPerson: new Person(name) })
  }

  saveNewPerson () {
    let state = { ...this.state }
    state.persons.push(this.state.newPerson)
    state.mode = 'view'
    state.newPerson = new Person()
    this.setState(state)
  }

  render () {
    const viewItemView = this.state.currentPersonIndex !== null ? <PersonView person={this.state.persons[this.state.currentPersonIndex]} /> : <div></div>

    const createItemLabel = <div><span className='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp;{'Add Person'}</div>
    const createItemView =
        <PersonEdit
          person={this.state.newPerson}
          saveName={(name: string) => this.saveNewPersonName(name)}
          save={() => this.saveNewPerson()}
          saveLabel={<span><span className='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp;Add</span>} />

    const editItemLabel = <div><span className='glyphicon glyphicon-pencil' aria-hidden='true'></span>&nbsp;{'Edit Person'}</div>
    const editItemView =
      <PersonEdit
          person={this.state.currentPerson}
          saveName={(name: string) => this.saveCurrentPersonName(name)}
          save={() => this.saveCurrentPerson()}
          saveLabel={<span><span className='glyphicon glyphicon-save' aria-hidden='true'></span>&nbsp;Save</span>} />

    return (
      <ItemExplorer
        title='People'
        mode={this.state.mode}
        setMode={this.setMode.bind(this)}
        items={this.state.persons}
        selectedItemIndex={this.state.currentPersonIndex}
        setSelectedItemIndex={this.setCurrentPersonIndex.bind(this)}
        constructItemPreview={ (person: Person) => <span>{person.name}</span> }
        viewItemView={ viewItemView }
        createItemOptions={ {
          createItemLabel: createItemLabel,
          createItemView: createItemView
        } }
        editItemOptions={ {
          editItemLabel: editItemLabel,
          editItemView: editItemView
        } } />
    )
  }
}
