import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../lib/init-firebase';


export default function Test() {
    const [player, SetPlayer] = useState([]);

  useEffect(()=> {
      getPlayer()
  }, []);

  useEffect(()=> {
        console.log(player)
    }, [player]);

    function getPlayer(){
        const playerRef = collection(db, 'stats');
        getDocs(playerRef).then(response => {
            const movs = response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            SetPlayer(movs);
        }).catch(error => console.log(error.message));
    }

    return <div>
        DUPA
        <ul>  //{player.id}
            <h1>{player.map(player => <li key={player.data} > {player.data.playerTwo}   {player.data.playerOne} </li>
            )
            }
            </h1>
        </ul>


    </div>
}
