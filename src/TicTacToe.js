/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import { io } from "socket.io-client";
const socket = io("http://189.82.239.135:3333");

function TicTacToe() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [winner, setWinner] = useState(null);

  useEffect(()=>{

    socket.on('connect', () => {
      socket.emit('select_room', {name:'Yago Paiva', room: 'One'})
    })
    socket.on('message', (data)=>{
      console.log(data)
    })
    socket.on('board',(receive)=>{
      setBoard(receive)
    })
    socket.on('Winner', receive => {
      setWinner(receive)
    })
  },[])

  const handleCellClick = (index)=>{
    
    if(board[index] !== ""){
      console.log("Posição ocupada!");
      return null;
    } 
    socket.emit('handleClick', {index} )
  }

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index)=>(
            <div 
            key={index}
            className={`cell ${item}`}
            onClick={()=>handleCellClick(index)}
            >
            {item}
            </div>
        ))}
      </div>
      {winner &&
        <footer>
          {winner === "E" ?
          <h2 className="winner-message">
            <span className={winner}>Empatou!</span>
          </h2>
          :
          <h2 className="winner-message">
            <span className={winner}>{winner}</span> Venceu!
          </h2>
          }
          <button onClick={()=>{
            socket.emit('restart', true)
            setWinner('')
          }}>Recomeçar</button>
        </footer>
      }
      <span className="created-by">Criado por Yago Paiva</span>
    </main>
  );
}
export default TicTacToe;
