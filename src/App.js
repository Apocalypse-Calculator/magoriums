import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header, Content } from "./components";
import { Home } from "./pages";
import { Layout } from "antd";

const { Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Content>
          <Home />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
