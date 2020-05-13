import React, { Component } from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.min';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <SecureRoute path="/protected" component={Protected} />
          <Route path="/implicit/callback" component={LoginCallback} />
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

const Protected = () => (
  <div>
    <h1>Protected</h1>
  </div>
);

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
