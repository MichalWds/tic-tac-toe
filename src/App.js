import './App.css';
import Game from "./components/Game";
import Forms from "./components/Forms";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Test from "./components/Test";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/game" component={() => <Game authorized={true}/>}/>
                <Route exact path="/" component={() => <Forms/>}/>
            </Switch>
        </Router>
    );
}

export default App;