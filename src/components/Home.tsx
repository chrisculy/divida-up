import * as React from 'react'
import { match } from 'react-router-dom'
import { ItemExplorer } from './ItemExplorer'
import Person from './Person'

interface HomeProps {
  match?: match<null>
}

interface HomeState {
  persons: string[]
  currentPerson: string
  currentPersonIndex: number | null
  newPerson: string
  mode: 'create' | 'edit' | 'view'
}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor (props: HomeProps) {
    super(props)
    this.state = {
      persons: [ 'Thomas', 'Benjamin', 'Margaret', 'Phoebe' ],
      currentPerson: '',
      currentPersonIndex: null,
      newPerson: '',
      mode: 'view'
    }
  }

  setMode (mode: 'create' | 'edit' | 'view') {
    this.setState({ ...this.state, mode: mode })
  }

  setCurrentPersonIndex (index: number) {
    if (this.state.currentPersonIndex !== index) {
      this.setState({ ...this.state, currentPerson: this.state.persons[index], currentPersonIndex: index, mode: 'view' })
    }
  }

  updateCurrentPerson (e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, currentPerson: e.target.value })
  }

  updateNewPerson (e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, newPerson: e.target.value })
  }

  saveNewPerson (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    let state = { ...this.state }
    state.persons.push(this.state.newPerson)
    state.mode = 'view'
    state.newPerson = ''
    this.setState(state)
  }

  saveCurrentPerson (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    if (this.state.currentPersonIndex !== null) {
      let state = { ...this.state }
      state.persons[this.state.currentPersonIndex] = state.currentPerson
      state.mode = 'view'
      this.setState(state)
    }
  }

  render () {
    const constructCreateItemView = () => {
      return (
        <div>
          <input
            type='text'
            className='form-control'
            value={this.state.newPerson}
            onChange={(e) => this.updateNewPerson(e)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                this.saveNewPerson(e)
              }
            }}></input>
          <button type='button' className='btn btn-default' onClick={(e) => this.saveNewPerson(e)}>
            <span className='glyphicon glyphicon-plus' aria-hidden='true'></span>
            &nbsp;Add
          </button>
        </div>
      )
    }

    const constructEditItemView = (item: string) => {
      return (
        <div>
          <input
            type='text'
            className='form-control'
            value={this.state.currentPerson}
            onChange={(e) => this.updateCurrentPerson(e)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                this.saveCurrentPerson(e)
              }
            }}></input>
          <button type='button' className='btn btn-default' onClick={(e) => this.saveCurrentPerson(e)}>
            <span className='glyphicon glyphicon-save' aria-hidden='true'></span>
            &nbsp;Save
          </button>
        </div>
      )
    }

    const createItemLabel = <div><span className='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp;{'Add Person'}</div>
    const editItemLabel = <div><span className='glyphicon glyphicon-pencil' aria-hidden='true'></span>&nbsp;{'Edit Person'}</div>

    return (
      <div className='col-md-6'>
        <ItemExplorer
          title='People'
          mode={this.state.mode}
          setMode={this.setMode.bind(this)}
          items={this.state.persons}
          selectedItemIndex={this.state.currentPersonIndex}
          setSelectedItemIndex={this.setCurrentPersonIndex.bind(this)}
          constructItemPreview={ (item) => <span>{item}</span> }
          constructItemView={ (item: string) => <Person name={item} /> }
          createItemOptions={ {
            createItemLabel: createItemLabel,
            constructCreateItemView: constructCreateItemView
          } }
          editItemOptions={ {
            editItemLabel: editItemLabel,
            constructEditItemView: constructEditItemView
          } } />
      </div>
    )
  }
}
