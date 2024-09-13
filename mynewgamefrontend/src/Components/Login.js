import React from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect} from 'react';
import { Form,Button } from 'react-bootstrap';
import axios from 'axios';
import { MY_URL } from './Helper';
function Login() {
    const [err,seterr]=useState("");
    const navigate=useNavigate();
    const [sta,setsta]=useState("");
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    const handleChange=(e)=>{
        seterr("");
        setsta("");
    const {name,value} = e.target;
        setUser ({
          ...user,
          [name]:value})
    }
    const login=(e)=>{
        e.preventDefault();
        console.log(user);
        seterr("");
        setsta("1");
        axios.post(MY_URL+"login",user).then((res)=>{
            if(res.data.message==="Log in successFull") {
                localStorage.setItem('logintoken',1);
                localStorage.setItem('email',user.email);
                seterr("");
                setsta("");
                navigate("/dashboard");
                window.location.reload();
            }
            else {
                setsta("");
                seterr(res.data.message);
            }
        })
    }

    useEffect(()=>{
        if(localStorage.getItem('logintoken')!=null) {
            localStorage.removeItem('logintoken');
            window.location.reload();
        }
    })
  return (
    <div className='text-center pt-5 forsign'>
        <div className='container'>
            <h2 className='pt-5'>Please Log in</h2>
        <Form className='pp2 rounded rounded-5 pt-1' onSubmit={login}>
            {err!=="" && <h5 className='text-danger'>{err}</h5>}
            {sta!=="" && <h5 className='text-success'>Loading...</h5>}
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Your Email"
                required
                value={user.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2 m-2">
              <Button variant="primary" type="submit">
                Log in
              </Button>
              <Link to="/forgotpassword">Forgot Password ? </Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Login