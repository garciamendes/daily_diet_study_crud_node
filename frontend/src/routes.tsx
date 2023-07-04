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
import { SnackDetail } from './containers/SnackDetail'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/register' component={Register} />

        <PrivateRoute path='/home' exact component={Home} />
        <PrivateRoute path='/snack/:id' exact component={SnackDetail} />
        <PrivateRoute path='/snack/summary' exact component={Summary} />

        <PrivateRoute path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}