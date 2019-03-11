import React, { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import ApolloClient from "apollo-boost";
import { settings } from "./settings";
import { ApolloProvider } from "react-apollo";
import { Main } from "./Main";
import { PropertyList } from "./PropertyList";

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
            <PropertyList />
          </Main>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default App;
