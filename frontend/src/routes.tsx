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
        <Route path='/' exact component={Login} />
        <Route path='/register' component={Register} />

        <Route path='/home' component={Home} />
        <Route path='/snack/:id' component={SnackDetail} />
        <Route path='/summary' component={Summary} />

        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}