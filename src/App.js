import './App.css';
import Game from "./components/Game";
import Forms from "./components/Forms";
import Forms2 from "./components/Forms2";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/game" component={() => <Game authorized={true}/>}/>
                {/*<Route exact path="/" component={Forms}/>*/}
                <Route exact path="/" component={() => <Forms2/>}/>
            </Switch>
        </Router>
    );
}

export default App;
