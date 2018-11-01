import React from "react";
import PostList from "./pages/posts";
import Header from "./components/header";
import Footer from "./components/footer";

const App = () => (
  <div>
    <Header />
    <div className="container">
      <PostList />
    </div>
    <Footer />
  </div>
);

export default App;
