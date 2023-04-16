// React
import { Route, Redirect } from 'react-router-dom'

// Local
import { isAuthenticated } from '../utils/auth'

export const PublicRoute = ({ component: Component, restricted=false, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated() && restricted ?
        <Redirect to='/not-found' />
        : <Component {...props} />
    )} />
  )
}