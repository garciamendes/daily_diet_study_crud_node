// Third party
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Local
import { Home } from './containers/home'
import { PublicRoute } from './components/PublicRoute'
import { PrivateRoute } from './components/privateRoute'
import { NotFound } from './components/NotFound'
import { Login } from './containers/Auth/login'
import { Register } from './containers/Auth/register'
import { Summary } from './containers/summary'
import { SnackDetail } from './containers/SnackDetail'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/' exact component={Login} />
        <PublicRoute path='/register' component={Register} />

        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/snack/:id' component={SnackDetail} />
        <PrivateRoute path='/summary' component={Summary} />

        <PrivateRoute path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}