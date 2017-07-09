import * as React from 'react'
import { match } from 'react-router-dom'
import PersonEditor from './person/PersonEditor'

interface HomeProps {
  match?: match<null>
}

interface HomeState {
}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor (props: HomeProps) {
    super(props)
  }

  render () {
    return (
      <div className='col-md-6'>
        <PersonEditor />
      </div>
    )
  }
}
