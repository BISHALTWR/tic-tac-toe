'use client'
import Image from 'next/image'
import styles from './page.module.css'
import {useState,useEffect} from 'react'

export default function Home() {
  const [ticArr,setTicArr] = useState([-1,-1,-1, -1,-1,-1, -1,-1,-1]); // 3*3 array for storing content?
  const [turn,setTurn] = useState(0);
  const [GameOver,setGameOver] = useState(false);
  const processInput = (index) => {
    if(!GameOver && ticArr[index] === -1){
      setTicArr(
        ticArr.map((item,i)=>{
          return i===index?turn:item; //clicked position change garyo
        })
      )
      setTurn(turn===0?1:0);
    }
  }
  useEffect(()=> {
    checkWin();
  }, [ticArr])

  const checkWin = () => {
    //onlycheck row, column with the index element
    let combn = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let arr of combn){
      if(ticArr[arr[0]] !==-1 && ticArr[arr[0]] === ticArr[arr[1]] && ticArr[arr[1]] === ticArr[arr[2]]){
        setTurn(turn===0?1:0); //reverting change
        setGameOver(true);
        return true;
      }
    }
    return false;
  }

  return (
    <main className={styles.main}>
      <div className={styles.tictactoe}>
        {ticArr.map((item, index) => {
          if((index+1)%3===0){
            return (<div className={styles.endbox} onClick={()=>{
              processInput(index);
            }}>{item===-1?"":item}</div>)
          } else {
            return (<div className={styles.inbox} onClick = {()=>{
              processInput(index);
            }}>{item===-1?"":item}</div>)
          }
        })}
      </div>
      <div className={styles.reset} onClick={()=> {
        setTicArr([-1,-1,-1, -1,-1,-1, -1,-1,-1]);
        setGameOver(false);
        setTurn(0);
      }}><button>Reset</button></div>
      <div className={GameOver?styles.win:styles.hide}>{turn} Won</div>
    </main>
  )
}
