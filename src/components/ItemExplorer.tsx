import * as React from 'react'
import Toolbar from './Toolbar'

const toolbarStyle = {
  marginTop: '8px',
  marginBottom: '8px'
}

export interface ItemExplorerProps<T> {
  title: string
  mode: 'create' | 'edit' | 'view'
  setMode: (mode: 'create' | 'edit' | 'view') => void
  items: T[]
  selectedItemIndex: number | null
  setSelectedItemIndex: (index: number) => void
  constructItemPreview: (item: T) => JSX.Element
  viewItemView: JSX.Element
  createItemOptions?: {
    createItemLabel: JSX.Element
    createItemView: JSX.Element
  }
  editItemOptions?: {
    editItemLabel: JSX.Element
    editItemView: JSX.Element
  }
}

export default class ItemExplorer<T> extends React.Component<ItemExplorerProps<T>, never> {
  enterCreateMode () {
    this.props.setMode('create')
  }

  enterEditMode () {
    this.props.setMode('edit')
  }

  canEdit () {
    return this.props.selectedItemIndex != null
  }

  render () {
    const toolbar = (() => {
      const buttons: JSX.Element[] = []

      if (this.props.createItemOptions !== undefined) {
        buttons.push(<button type='button' className='btn btn-default' onClick={() => this.enterCreateMode()}>{this.props.createItemOptions.createItemLabel}</button>)
      }

      if (this.props.editItemOptions !== undefined) {
        buttons.push(<button type='button' className='btn btn-default' disabled={!this.canEdit()} onClick={() => this.enterEditMode()}>{this.props.editItemOptions.editItemLabel}</button>)
      }

      return <Toolbar buttons={buttons} style={toolbarStyle} />
    })()

    const items = this.props.items.map(this.props.constructItemPreview).map(
      (item, index) =>
        <li
          key={index}
          className={this.props.selectedItemIndex === index ? 'list-group-item active' : 'list-group-item'}
          onClick={() => this.props.setSelectedItemIndex(index)}>
          {item}
        </li>)

    const currentItemView = (() => {
      if (this.props.mode === 'create' && this.props.createItemOptions !== undefined) {
        return this.props.createItemOptions.createItemView
      } else if (this.props.mode === 'edit' && this.props.editItemOptions !== undefined) {
        return this.props.editItemOptions.editItemView
      } else if (this.props.mode === 'view') {
        return this.props.viewItemView
      }

      return {}
    })()

    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>{this.props.title}</div>
        <div className='panel-body'>
          <div className='container'>
            <div className='row'>
              {toolbar}
            </div>
            <div className='row'>
              <div className='col-xs-3'>
                <ul className='list-group'>
                  {items}
                </ul>
              </div>
              <div className='col-xs-9'>
                {currentItemView}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
