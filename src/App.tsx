import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CheckIcon } from './components/CheckIcon'
import { CrossIcon } from './components/CrossIcon'

type Player = {
  name: string
  prediction: number
  score: number
}

type MomentState = 'prediction' | 'result';

function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [rounds, setRounds] = useState(1)
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
    }
  }

  const sumScore = (player: Player) => {
    const BASE_POINTS = 5;
    return () => {
      player.score += BASE_POINTS + player.prediction;
      setPlayers([...players])
    }
  }

  return (
    <>

      <h1>1-3-5 Moderno</h1>
      <h2> Ronda: {rounds}</h2>
      <button onClick={addPlayer}> Agregar jugador</button>
      
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
            <div>
              <input type="text" value={player.name} />
              <input type="number" value={player.prediction} />
              { moment === 'prediction' ? 
                <>                
                  <button onClick={sumPlayerPrediction(player)}> + </button>
                  <button onClick={restPlayerPrediction(player)}> - </button>
                </>         
              : 
                  <>
                  <div className='button-check' onClick={sumScore(player)}> <CheckIcon /> </div>
                  <div className='button-cross' ><CrossIcon/> </div>
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
