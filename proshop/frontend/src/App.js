import React from 'react'
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { Container } from "react-bootstrap"
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'

import { BrowserRouter as Router, Route } from "react-router-dom"


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
