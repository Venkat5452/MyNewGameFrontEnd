import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Registered = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const { width, height } = useWindowSize()
  useEffect(() => {
    if(localStorage.getItem('forregister')) {
    const interval = setInterval(() => {
      // update the state after 1000ms
      setCount((currentCount) => currentCount-1);
    }, 1000);
    // when count is 0, navigate
    if(count===0) {
      localStorage.removeItem('forregister');
      navigate("/");
    }
    // clean up the interval
    return () => clearInterval(interval);
  }
  else {
    navigate("/");
  }
  }, [count, navigate]);
  return (
    <>
    <Confetti
      width={width}
      height={height}
    />
    <div className=" text-center ">
        <div className="m-5 p-5">
           <h2 className="text-success">Request done Succesfully...</h2> 
           <p>Redirecting you in {count} sec </p>
        </div>
    </div>
    </>
  );
};
export default Registered;