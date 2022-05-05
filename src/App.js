import './App.css';
import Game from "./components/Game";
import Forms from "./components/Forms";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
    return (
        <Router>

            <Switch>

                <Route exact path="/" component={Forms}/>
                <Route exact path="/game" component={() => <Game authorized={true}/>}/>

            </Switch>


        </Router>
    );
}

export default App;
