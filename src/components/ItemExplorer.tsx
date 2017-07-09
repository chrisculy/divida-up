import * as React from 'react'

export interface ItemExplorerProps<T> {
  title: string
  mode: 'create' | 'edit' | 'view'
  setMode: (mode: 'create' | 'edit' | 'view') => void
  items: T[]
  selectedItemIndex: number | null
  setSelectedItemIndex: (index: number) => void
  constructItemPreview: (item: T) => any
  constructItemView: (item: T | null) => JSX.Element
  createItemOptions?: {
    createItemLabel: JSX.Element
    constructCreateItemView: () => JSX.Element
  }
  editItemOptions?: {
    editItemLabel: JSX.Element
    constructEditItemView: (item: T) => JSX.Element
  }
}

export class ItemExplorer<T> extends React.Component<ItemExplorerProps<T>, never> {
  getSelectedItem () {
    return this.props.selectedItemIndex != null ? this.props.items[this.props.selectedItemIndex] : null
  }

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
      if (this.props.createItemOptions !== undefined && this.props.editItemOptions !== undefined) {
        return (
          <div className='col-xs-12 btn-group' role='group'>
            <button type='button' className='btn btn-default' onClick={() => this.enterCreateMode()}>{this.props.createItemOptions.createItemLabel}</button>
            <button type='button' className='btn btn-default' disabled={!this.canEdit()} onClick={() => this.enterEditMode()}>{this.props.editItemOptions.editItemLabel}</button>
          </div>
        )
      } else if (this.props.createItemOptions !== undefined) {
        return (
          <div className='col-xs-12 btn-group' role='group'>
            <button type='button' className='btn btn-default' onClick={() => this.enterCreateMode()}>{this.props.createItemOptions.createItemLabel}</button>
          </div>
        )
      } else if (this.props.editItemOptions !== undefined) {
        return (
          <div className='col-xs-12 btn-group' role='group'>
            <button type='button' className='btn btn-default' disabled={!this.canEdit()} onClick={() => this.enterEditMode()}>{this.props.editItemOptions.editItemLabel}</button>
          </div>
        )
      } else {
        return <div className='col-xs-12'></div>
      }
    })()

    const items = this.props.items.map(this.props.constructItemPreview).map(
      (item, index) =>
        <li
          key={index}
          className={this.getSelectedItem() === item ? 'list-group-item active' : 'list-group-item'}
          onClick={() => this.props.setSelectedItemIndex(index)}>
          {item}
        </li>)

    const currentItemView = (() => {
      const selectedItem = this.getSelectedItem()

      if (this.props.mode === 'create' && this.props.createItemOptions !== undefined) {
        return this.props.createItemOptions.constructCreateItemView()
      } else if (this.props.mode === 'edit' && this.props.editItemOptions !== undefined && selectedItem != null) {
        return this.props.editItemOptions.constructEditItemView(selectedItem)
      } else if (this.props.mode === 'view') {
        return this.props.constructItemView(selectedItem)
      }

      return {}
    })()

    const toolbarDivStyle = {
      marginTop: '8px',
      marginBottom: '8px'
    }

    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>{this.props.title}</div>
        <div className='panel-body'>
          <div className='container'>
            <div className='row' style={toolbarDivStyle}>
              {toolbar}
            </div>
            <div className='row'>
              <div className='col-xs-3'>
                <ul className='list-group'>
                  {items}
                </ul>
              </div>
              <div className='col-xs-6'>
                {currentItemView}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
