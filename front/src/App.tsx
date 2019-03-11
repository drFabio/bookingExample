import React, { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import ApolloClient from "apollo-boost";
import { settings } from "./settings";
import { ApolloProvider } from "react-apollo";
import { Main } from "./Main";
import { PropertyBrowser } from "./PropertyBrowser";

const client = new ApolloClient({
  uri: settings.graphqlUrl
});
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <ApolloProvider client={client}>
          <Main>
            <PropertyBrowser />
          </Main>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default App;
