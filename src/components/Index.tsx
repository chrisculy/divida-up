import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Root from './Root'
import Home from './Home'

// <Route path='group/add' component={GroupContainer} />
// <Route path='group/:groupId' component={GroupContainer}>
// 	<Route path='/person/add' component={PersonContainer} />
// 	<Route path='/person/:personId' component={PersonContainer} />
// 	<Route path='/report/add' component={ReportContainer} />
// 	<Route path='/report/:reportId' component={ReportContainer}>
// 		<Route path='/expense/add' component={ExpenseContainer} />
// 		<Route path='/expense/:expenseId' component={ExpenseContainer} />
// 	</Route>
// </Route>

const Index = () => {
  return (
    <Router>
      <Root>
        <Route exact path='/' component={Home} />
      </Root>
    </Router>
  )
}

export default Index
