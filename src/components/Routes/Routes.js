import { Route, Switch, withRouter } from "react-router-dom";
import React, { Component } from "react";
import News from "../../containers/News/News";
import Error from "../../components/Error/Error";

class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* <Redirect exact from="/" to="/us" /> */}
        <Route
          path="/"
          render={props => <News {...props} isAuthed={true} />}
          exact
        />
        <Route
          path="/:country"
          render={props => <News {...props} isAuthed={true} />}
          exact
        />
        <Route
          path="/:country/:category"
          render={props => <News {...props} isAuthed={true} />}
          exact
        />
        <Route component={Error} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
