import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  MainContainer,
  InnerContainer,
  Header,
  theme
} from "./components/presentational";
import { GlobalStyle } from "./GlobalStyle";
import ApolloClient from "apollo-boost";
import { settings } from "./settings";
import { ApolloProvider } from "react-apollo";
import { Main } from "./containers/Main";
import { About } from "./containers/About";

const client = new ApolloClient({
  uri: settings.graphqlUrl
});
function App() {
  useEffect(() => {
    document.title = "Book it!";
  });
  return (
    <React.Fragment>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Router>
            <MainContainer>
              <Header>
                Book it!
                <nav>
                  <Link to="/">Home</Link>
                  <Link to="/about/">About</Link>
                </nav>
              </Header>
              <InnerContainer>
                <Route path="/" exact component={Main} />
                <Route path="/about" exact component={About} />
              </InnerContainer>
            </MainContainer>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
