import React, { Component, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  Security,
  SecureRoute,
  LoginCallback,
  useOktaAuth,
} from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.min';

import ReactQuillPage from './ReactQuill';
import DraftJsPage from './DraftJs';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/unprotected/:id" component={Unprotected} />
            <SecureRoute path="/protected/:id" component={Protected} />
            <Route path="/react-quill" component={ReactQuillPage} />
            <Route path="/draftjs" component={DraftJsPage} />

            <Route path="/implicit/callback" component={LoginCallback} />
          </Switch>
        </AuthWrapper>
      </BrowserRouter>
    </div>
  );
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const Login = () => (
  <div>
    <h1>Login</h1>
    <OktaSignInWidget />
  </div>
);

class OktaSignInWidget extends Component {
  componentDidMount() {
    this.widget = new OktaSignIn({
      baseUrl: 'https://test.idp.idm.cms.gov',
      authParams: {
        pkce: true,
        issuer: 'https://test.idp.idm.cms.gov/oauth2/aus2e96etlbFPnBHt297',
        responseMode: 'query',
      },
      el: '#sign-in-widget',
    });

    this.widget.showSignInToGetTokens({
      authorizationServerId: 'aus2e96etlbFPnBHt297',
      clientId: '0oa2e913coDQeG19S297',
      redirectUri: 'http://localhost:3000/implicit/callback',
      scope: 'openid profile email',
    });
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return (
      <div>
        <div id="sign-in-widget" />
      </div>
    );
  }
}

const Unprotected = () => {
  const history = useHistory();
  const { id } = useParams();
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Unprotected</h1>
      <p>{`Current Count: ${counter}`}</p>
      <button onClick={() => setCounter((prev) => prev + 1)}>
        Add to Counter
      </button>
      <button onClick={() => history.push(`/unprotected/${parseInt(id) + 1}`)}>
        Next Page
      </button>
    </div>
  );
};

const Protected = () => {
  const history = useHistory();
  const { id } = useParams();
  const [counter, setCounter] = useState(0);
  const { authService } = useOktaAuth();
  return (
    <div>
      <h1>Protected</h1>
      <p>{`Current Count: ${counter}`}</p>
      <button onClick={() => setCounter((prev) => prev + 1)}>
        Add to Counter
      </button>
      <button onClick={() => history.push(`/protected/${parseInt(id) + 1}`)}>
        Next Page
      </button>

      <button onClick={() => authService.logout()}>Logout</button>
    </div>
  );
};

const AuthWrapper = ({ children }) => {
  const history = useHistory();

  const handleAuthRequiredRedirect = () => {
    history.push('/login');
  };
  return (
    <Security
      issuer="https://test.idp.idm.cms.gov/oauth2/aus2e96etlbFPnBHt297"
      clientId="0oa2e913coDQeG19S297"
      redirectUri="http://localhost:3000/implicit/callback"
      onAuthRequired={handleAuthRequiredRedirect}
      responseType={['code']}
      pkce
    >
      {children}
    </Security>
  );
};

export default App;
