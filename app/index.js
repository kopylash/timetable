import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { RaisedButton }  from 'material-ui'

const ACTIVE = {color: 'red'};

let injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
    <div>
      <RaisedButton label="Just do it" />
    </div>

    )
  }
}

render((
  <Router >
    <Route path="/" component={App}>


    </Route>
  </Router>
), document.getElementById('content'));
