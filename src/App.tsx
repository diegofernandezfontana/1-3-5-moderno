import { useState } from 'react'
import './App.css'
import { CheckIcon } from './components/CheckIcon'

type Player = {
  name: string
  prediction: number
  score: number
}

type MomentState = 'prediction' | 'result';

function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [moment, setMoment] = useState<MomentState>('prediction');
  const defaultPlayer = {name: 'Jugador JAVO', prediction: 0, score: 0};

  const addPlayer = () => {
    setPlayers([...players, defaultPlayer])
  }

  const restPlayerPrediction = (player: Player) => {
    return () => {
      player.prediction -= 1
      setPlayers([...players])
    }
  }
  
  const sumPlayerPrediction = (player: Player) => {
    return () => {
      player.prediction += 1
      setPlayers([...players])
    }
  }

  const checkResult =() => {
    if(moment === 'prediction'){
      setMoment('result')
    } else {
      setMoment('prediction')
      const restartedPlayersPredictions = players.map(player => {
        player.prediction = 0;
        return player;
      })

      setPlayers(restartedPlayersPredictions)
    }
  }

  const sumScore = (player: Player) => {
    const BASE_POINTS = 5;
    return () => {
      player.score += BASE_POINTS + player.prediction;
      setPlayers([...players])
    }
  }
  const editName = (player: Player) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      player.name = event.target.value;
      setPlayers([...players])
    }
  }

  return (
    <>

      <h1>1-3-5 Moderno</h1>
      <button onClick={addPlayer}> Agregar jugador</button>
      <br></br>
      <hr></hr>
      <br></br>
      <div>
        <div className='table-container'>
          <div>
            Jugador
          </div>
          <div>
            Prediccion:
          </div>
          
        </div>
        {players.map(player =>  {
          return(
            <div className='row'>
              <input type="text" value={player.name} onChange={editName(player)}/>
              <div className='input-prediction'> {player.prediction} </div>
              { moment === 'prediction' ? 
                <>                
                  <button onClick={sumPlayerPrediction(player)}> + </button>
                  <button onClick={restPlayerPrediction(player)}> - </button>
                </>         
              : 
                  <>
                  <div className='button-check' onClick={sumScore(player)}> <CheckIcon /> </div>
                </>
              }
            

              <p style={{display: "inline"}}>Puntaje: {player.score}</p>
            </div>
          )
        })}
      </div>

      <button onClick={checkResult}> { moment === "prediction" ? "Checkear Resultados" : "Prediccion"}</button>
    </>
  )
}

/*

      <div className='button-check' onClick={() => {}}> <CheckIcon /> </div>
      <div className='button-cross' ><CrossIcon/> </div>
*/

export default App
