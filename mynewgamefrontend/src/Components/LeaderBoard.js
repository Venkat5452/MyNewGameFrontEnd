import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { MY_URL } from './Helper';
import { GiGlassCelebration } from "react-icons/gi";
function LeaderBoard() {
    const [flag,setflag]=useState(false);
    const [data,setdata]=useState({})
    useEffect(()=>{
        if(!flag) {
            axios.post(MY_URL + "getalldetails").then((res)=>{
                if(res.data) {
                    setdata(res.data.records);
                    setflag(true);
                }
            })
        }
    })
  return (
    <>
    <div>
        {!flag && <div className='text-success'>
            Loading please wait....
        </div>}
        {flag && <div className='mt-1'>
            <h4>Here are the top 10 players</h4>
            <h4>Congratulations Guys..<GiGlassCelebration /></h4>
            <div className="table-responsive">  
        <table class="table table-dark">
        <thead >
          <tr>
            <th scope="col"> <h6>Rank</h6> </th>
            <th scope="col"> <h6>Name</h6>  </th>
            <th scope="col"><h6>Score</h6></th>
          </tr>
        </thead>
        <tbody>
         { data.map((x,id)=>{
          return (
          <tr>
            <th scope="row">{id+1}</th>
             <td><h6>{x.name}</h6></td>
             <td><h6>{x.score}</h6></td>
             </tr>
           )
          })}
        </tbody>
        </table>
        </div></div>
        }
    </div>
    </>
  )
}

export default LeaderBoard