import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
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
      <App title='divida-up'>
        <Route path='/' render={ (match) => <Home {...match} /> } />
      </App>
    </Router>
  )
}

export default Index
