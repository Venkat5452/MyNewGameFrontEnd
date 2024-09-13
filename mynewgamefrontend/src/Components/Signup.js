import React from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect} from 'react';
import { Form,Button } from 'react-bootstrap';
import PasswordChecklist from "react-password-checklist";
import axios from 'axios';
import { MY_URL } from './Helper';
function Signup() {
    const navigate=useNavigate();
    const [flag,setflag]=useState(false);
    const [err,seterr]=useState("");
    const [sta,setsta]=useState("");
    const [user,setUser]=useState({
        email:"",
        name:"",
        password:"",
        otp:"" 
    });
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
        setsta("1");
        seterr("");
        console.log(user);
        if(user.password.length>=8) {
        axios.post(MY_URL + "makemail",user).then((res)=>{
            if(res.data==="OTP SENT Succesfully") {
                setflag(true);
                setsta("");
            }
            else {
                seterr(res.data);
                setsta("");
            }
        })
        }
        else {
            seterr("Invalid Details");
            setsta("");
        }
    }
    const handleSubmit2=(e)=>{
        e.preventDefault();
        setsta("1");
        seterr("");
        console.log(user);
        axios.post(MY_URL + "signup",user).then((res)=>{
            if(res.data==="SuccessFully Registered") {
                setsta("");
                localStorage.setItem('forregister',1);
                navigate("/registered");
            }
            else {
                seterr(res.data);
                setsta("");
            }
        })
    }
    const cancel=(e)=>{
        e.preventDefault();
        setflag(false);
    }
    useEffect(()=>{
      localStorage.removeItem('forregister');
      localStorage.removeItem('logintoken');
    })
  return (
    <div className='text-center pt-5 forsign'>
        <div className='container'>
        {!flag && <div>
        <h1 className='pt-2'>Register Here</h1>
        {err!=="" && <span className='text-danger'>{err}</span>}
        {sta!=="" && <span className='text-success'>Loading..</span>}
        <Form className='pp1 rounded rounded-5 pt-1' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                required
                value={user.name}
                onChange={handleChange}
              />
            </Form.Group>
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
            <Form.Group>
						<Form.Control 
							type="password" 
							placeholder="Enter Password"
                            name="password"
							onChange={handleChange}
                            required
						/>
						<PasswordChecklist
							rules={["minLength","specialChar","number","capital"]}
							minLength={8}
                            name="password"
							value={user.password}
							onChange={(isValid) => {}}
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
        <h3 className='pt-5'>Enter OTP Sent to : </h3>
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
                Register
              </Button>
              <Button variant="danger" onClick={cancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>}
        </div>
    </div>
  )
}

export default Signup