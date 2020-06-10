import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ReactQuillPage from './ReactQuill';
import DraftJsPage from './DraftJs';
import TinyMCEPage from './TinyMCE';

import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/react-quill" component={ReactQuillPage} />
          <Route path="/draftjs" component={DraftJsPage} />
          <Route path="/tinymce" component={TinyMCEPage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default App;
