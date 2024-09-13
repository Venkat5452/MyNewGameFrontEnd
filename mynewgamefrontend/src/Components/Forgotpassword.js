import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';
import { Form,Button } from 'react-bootstrap';
import { MY_URL } from './Helper';
import { useNavigate } from 'react-router-dom';
function Forgotpassword() {
    const [err,seterr]=useState("");
    const [sta,setsta]=useState("");
    const [flag,setflag]=useState(false);
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        otp:"",
        password:""
    })
    const handleChange=(e)=>{
        seterr("");
        setsta("");
        const {name,value} = e.target;
        setUser ({
          ...user,
          [name]:value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        seterr("");
        setsta("1");
        axios.post(MY_URL + "forgotpassword",user).then((res)=>{
            if(res.data==="OTP SENT Succesfully") {
                setsta("");
                setflag(true);
            }
            else {
                seterr(res.data);
                setsta("");
            }
        })
    }
    useEffect(()=>{
        localStorage.removeItem('logintoken');
    })
    const cancel=(e)=>{
        e.preventDefault();
        navigate("/");
        window.location.reload();
    }
    const handleSubmit2=(e)=>{
        e.preventDefault();
        seterr("");
        setsta("1");
        axios.post(MY_URL + "resetpassword",user).then((res)=>{
            if(res.data==="SuccessFull") {
                setsta("");
                localStorage.setItem("forregister",1);
                navigate("/registered");
            }
            else {
                seterr(res.data);
                setsta("");
            }
        })
    }
  return (
    <>
    <div className='text-center pt-5 forsign'>
        <div className='container'>
            <h3 className='pt-3'>Reset Your Password</h3>
            {!flag && <div>
            {err!=="" && <span className='text-danger'>{err}</span>}
            {sta!=="" && <span className='text-success'>Loading..</span>}
            <Form className='pp1 rounded rounded-5 pt-1' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2 m-2">
              <Button variant="primary" type="submit">
                Submit Details
              </Button>
            </div>
            </Form>
            </div>}
            {flag && <div>
        <h5 className='pt-1'>Enter OTP Sent to : </h5>
        <span>{user.email}</span> <br></br>
        {err!=="" && <span className='text-danger'>{err}</span>}
        {sta!=="" && <span className='text-success'>Loading..</span>}
        <Form className='pp1 rounded rounded-5 p-2' onSubmit={handleSubmit2}>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="otp"
                placeholder="Enter Otp"
                required
                value={user.otp}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid gap-2 m-2">
              <Button variant="primary" type="submit">
                Verify OTP
              </Button>
            </div>
          </Form>
        </div>}
            <Button variant="danger" onClick={cancel}>
                Cancel
            </Button>
        </div>
    </div>
    </>
  )
}

export default Forgotpassword