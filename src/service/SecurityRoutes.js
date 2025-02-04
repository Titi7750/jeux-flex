import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Backoffice from '../../js/components/Backoffice';
import { getRoles, isAuthenticated } from './auth';

const requireAdmin = (to, from, next) => {
  if (isAuthenticated() && getRoles() === 'ROLE_ADMIN') { //
    next();
  } else {
    next.redirect('/LoginUser');
  }
};

const SecurityRoutes = () => {
  const history = useHistory();

  return (
    <GuardProvider history={history}>
      <Router>
        <Switch>
          <GuardedRoute path="/Backoffice" component={Backoffice} guard={requireAdmin} />
        </Switch>
      </Router>
    </GuardProvider>
  );
};

export default SecurityRoutes;