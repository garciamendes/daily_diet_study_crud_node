// Third party
import { BrowserRouter, Switch } from 'react-router-dom'

// Local
import { Home } from './containers/home'
import { PublicRoute } from './components/PublicRoute'
import { NotFound } from './components/NotFound'
import { PrivateRoute } from './components/privateRoute'
import { Login } from './containers/Auth/login'
import { Register } from './containers/Auth/register'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/register' component={Register} />
        <PublicRoute path='/not-found' component={NotFound} />
        {/* <PublicRoute path='/' component={Home} /> */}
        <PrivateRoute path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}