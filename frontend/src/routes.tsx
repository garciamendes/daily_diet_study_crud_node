// Third party
import { BrowserRouter, Switch } from 'react-router-dom'

// Local
import { Home } from './containers/home'
import { PublicRoute } from './components/PublicRoute'
import { NotFound } from './components/NotFound'
import { PrivateRoute } from './components/privateRoute'
import { Login } from './containers/Auth/login'
import { Register } from './containers/Auth/register'
import { Summary } from './containers/summary'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/login' exact component={Login} />
        <PublicRoute path='/register' exact component={Register} />

        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/summary' exact component={Summary} />

        <PrivateRoute path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}