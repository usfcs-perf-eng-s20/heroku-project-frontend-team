import React from "react";
import {Switch, Route} from "react-router-dom";
import HelloWorld from "./components/HelloWorld";
import Home from "./components/Home";
import Product from "./components/Product";
import Profile from "./components/Profile";
import Search from "./components/Search";
import MyTop from "./components/MyTop";

const Routes = () => {
    return(
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/helloworld" component={HelloWorld}/>
                <Route path="/product/:id" component={Product}/>
                <Route path="/me" component={Profile}/>
                <Route path="/search" component={Search}/>
                <Route path="/top" component={MyTop}/>
            </Switch>
    )
}

export default Routes;
    
    
    