import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../lib/init-firebase';
import {useHistory} from "react-router-dom";

export default function Test() {
    const [player, SetPlayer] = useState([]);

    useEffect(() => {
        getPlayer()
    }, []);

    useEffect(() => {
        console.log(player)
    }, [player]);

    function getPlayer() {
        const playerRef = collection(db, 'stats');
        getDocs(playerRef).then(response => {
            const movs = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            SetPlayer(movs);
        }).catch(error => console.log(error.message));
    }

    const hist = useHistory();

    const routeChange = () => {
        hist.push("/");
        window.location.reload();
    }
    return <div className="game">
        <div className="stats"><h1>WIN STATISTICS</h1></div>
        <ul>
            <h2>{player.map(player => <li key={player.data}>
                {player.data.player} : {player.data.score} </li>)}
            </h2>
        </ul>
        <button color="primary" className="button-login" onClick={routeChange}>
            START NEW GAME
        </button>
    </div>
}
