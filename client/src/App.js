import React from 'react';
import Search from "./components/Search";
import { Container, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuAppBar from "./components/nav";
import DenseAppBar from "./components/MainNav";

class App extends React.Component {
  render() {
    return (
        <>
            <DenseAppBar />
            <MenuAppBar />
        </>
    )
  }
}

export default App;
