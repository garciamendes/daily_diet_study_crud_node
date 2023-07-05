// React
import { Route, Redirect } from 'react-router-dom'

// Local
import { isAuthenticated } from '../utils/auth'

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated() ?
         <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
}