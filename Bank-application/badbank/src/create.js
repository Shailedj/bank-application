import { useState } from "react";
import { useFormik } from "formik";
import axios from 'axios'
import './create.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Create() {
  const [val1,setVal1]=useState("none");
  const [val2,setVal2]=useState("block");
  const [val3,setVal3]=useState("block");

  let url = "http://localhost:1337/api/banks";
  const Formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:""
    },
    onSubmit:(values)=>{
      alert("successfully your account is created");
      document.getElementById("form").reset(" ");
      setVal1("block");
      setVal2("none");
      setVal3("none");
      axios.post(url,{
        "data":{
          "Name":values.name,
          "Email":values.email,
          "Balance":0
        }
      })
    
    },
    validate:(values)=>{
            let errors={};
            if(!values.name) errors.name="Required";
            if(!values.email) errors.email="Required"
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address'
            }
            if(!values.password) errors.password="Field Required"
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)){
              errors.password="Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
            }
            return errors
    }
  })
  return (
    <>
    <div className="create">
      <form className="create-form p-3 rounded shadow" id="form" style={{display:`${val3}`}} onSubmit={Formik.handleSubmit}>
        <h1 className="mb-4">Create Your Account</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">Name:</label>
          <input type="text" className="form-control" id="name" onChange={Formik.handleChange} values={Formik.values.name} />
          {Formik.errors.name?<div style={{color:"red"}}>{Formik.errors.name}</div>:null}

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">Email:</label>
          <input type="text" className="form-control" id="email" onChange={Formik.handleChange} values={Formik.values.email} />
          {Formik.errors.email?<div style={{color:"red"}}>{Formik.errors.email}</div>:null}

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">Password:</label>
          <input type="password" className="form-control" id="password" onChange={Formik.handleChange} values={Formik.values.password} /> 
          {Formik.errors.password?<div style={{color:"red"}}>{Formik.errors.password}</div>:null}

        </div>
        <button type="submit" className="btn btn-primary" style={{display:`${val2}`}} disabled={!Formik.isValid}>Create Account</button>

      </form>
      <button className="create-form p-3 rounded shadow"  style={{display:`${val1}`}} onClick={()=>{setVal3("block");setVal1("none");setVal2("block")}} type="button">Add Account</button>

      </div>

    </>
  );
}
