import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
// import Header from "./components/Header";
import NotFoundPage from './pages/noFoundPage';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';

const Routes: React.SFC<RouteComponentProps> = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(true);

    return (
        <div>
            {/* <Header /> */}
        
                    <Switch>
                        <Redirect exact={true} from="/" to="/home" />
                        <Route exact={true} path="/home" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
            
        </div>
    );
};
const RoutesWrap: React.SFC = () => {
    return (
        <Router>
            <Route component={Routes}/>
        </Router>
    )
}
export default RoutesWrap; 