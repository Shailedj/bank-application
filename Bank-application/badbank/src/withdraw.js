import { useState} from "react"
import axios from "axios";
import { useEffect } from "react";
import { useFormik } from "formik";

export default function Withdraw(){
  const [data,setData]=useState();
  const [item,setItem]=useState([]);
  const [balence,setBalence]=useState();
  const url="http://localhost:1337/api/banks";
    useEffect(() => {
      async function fetchdata() {
        let res = await axios(url);
        let result = res.data;
        setData(result);
        // console.log(res);
        let newItems = data.data.map((item) => {
        let Id=item.id;
        
        // console.log(item.id);
        let { Name, Email, Balance} = item.attributes;
        // console.log(Img);
        return { Name, Email, Balance,Id};
      })
      // console.log(newItems);
      setItem([...newItems]);
      setBalence(item[item.length-1].Balance)
      
      }
      fetchdata();
    },[data]);
    const Formik=useFormik({
      initialValues: {
        withdraw: ""
      },
      onSubmit:(values)=>{
        const push=Number(balence)-Number(values.withdraw);
        axios.put(`http://localhost:1337/api/banks/${item[item.length-1].Id}`,{

   data:
  {
      Balance: push 
  }

}
  )
      },
      validate:(values)=>{
        let errors={};
        if(!values.withdraw) errors.withdraw="Required";
        if(values.withdraw !== "" && isNaN(parseFloat(values.withdraw))) errors.withdraw = "Just Numbers allowed";
        if(values.withdraw >= balence){alert("please valid amount")}
        return errors
      }
    })
   

    return(<>
    

    <h1 style={{margin:"4% 0 0 33%",fontFamily:"unset",fontWeight: "bold",color: "cadetblue"}}>Withdraw your Account</h1>
        <form class="row g-3" onSubmit={Formik.handleSubmit} style={{margin:"2% 0 0 35%"}}>
  <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Enter the amount</label>
    <input type="text" class="form-control" name="withdraw" id="inputPassword2" placeholder="Enter the amount" onChange={Formik.handleChange} values={Formik.values.withdraw}/>
    {Formik.errors.withdraw?<div style={{color:"red"}}>{Formik.errors.withdraw}</div>:null}
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary mb-3" disabled={!Formik.isValid}>WithDraw</button>
  </div>
</form>
    <h2 style={{margin:"0 0 0 35.5%"}}>Balance  is {balence}</h2>
    </>)
}