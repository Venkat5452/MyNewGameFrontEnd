import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MY_URL } from './Helper';
import { Button, Form } from 'react-bootstrap';
import {FaUser} from "react-icons/fa";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';
import { GiGlassCelebration } from "react-icons/gi";
function Dashboard() {
    const navigate=useNavigate();
    const [flag,setflag]=useState(false);
    const [count, setCount] = useState(5);
    const { width, height } = useWindowSize();
    const [flag1,setflag1]=useState(false);
    const [rec,setrec]=useState("N/A");
    const [name,setname]=useState("");
    const [randomNumber,setrandomnumber]=useState(0);
    const [score,setScore] = useState(0);
    const [guess,setGuess] = useState('');
   const [currGuess,setcurrGuess]=useState([]);
   const [user,setuser]=useState({
    email:localStorage.getItem('email'),
    score:0
   })
    useEffect(()=>{
        if(!localStorage.getItem('logintoken')) {
            navigate("/");
        }   
        else {
          if(!flag) {
            axios.get(MY_URL + "getName/"+localStorage.getItem('email')).then((res)=>{
              if(res.data) {
                setflag(true);
                setname(res.data[0].name);
                setScore(res.data[0].score);
                setrandomnumber(Math.floor(Math.random() * 10)+1);
              }
            })
          }
          if(flag1) {
            user.score=100-(currGuess.length/2);
            console.log(user);
            axios.post(MY_URL + "addscore",user).then((res)=>{
              if(res.data==="Done") {
                window.location.reload();
              }
            })
          }
        }
    })
    const Guess=(e)=>{
      e.preventDefault();
      console.log(randomNumber);
      console.log(guess);
      if(Number(guess)===randomNumber) {
        setrec("Yayy..");
        setflag1(true);
      }
      else if(guess<randomNumber) {
        setrec("Your Guess is Lower");
        setcurrGuess(prevStateArray => [...prevStateArray, guess ,","]);
      }
      else {
        setrec("Your Guess is Upper");
        setcurrGuess(prevStateArray => [...prevStateArray, guess ,","]);
      }
      console.log(currGuess);
    }
  return (
    <>
    {!flag && <div><h3 className='text-success'>Setting your Environment....</h3></div>}
    {flag && !flag1 && 
    <div className=''>
      <div className="d-flex justify-content-between">
      <div><h6>Score : {score}</h6></div>
      <div><h3>Welcome to Number Game</h3></div>
      <div className=''>
      <span><FaUser/>{name}</span>
      </div>
      </div>
      <div>
        <div className='pt-5'>
          <p>Guess the Number between 1 to 20</p>
          <div>
          <Form className='pp1 rounded rounded-5 pt-1' >
          <Form.Group>
          <Form.Control
                type="number"
                name="number"
                placeholder="Enter Your Number"
                required
                value={guess}
                onChange={(e)=>setGuess(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2 m-2">
              <Button variant="primary" type="submit" onClick={Guess}>
                Guess
              </Button>
            </div>
          </Form>
          <div>
          <h6>Your Guess : {rec}</h6>
          <h6>current Guesses : {currGuess} </h6>
          </div>
          </div>
        </div>
      </div>
    </div>}
    {flag && flag1 &&<div>
      <Confetti
      width={width}
      height={height}
      />
    <div className=" text-center ">
        <div className="m-5 p-5">
           Congratulations You did it <GiGlassCelebration />
           <p>Back to Game in {count} sec </p>
        </div>
    </div>
      </div>}
    </>
  )
}

export default Dashboard