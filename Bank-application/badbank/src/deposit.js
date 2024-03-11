import { useState } from "react"
import { useFormik } from "formik";
import { useEffect } from "react";
import axios from "axios";

export default function Deposit() {
  const [data, setData] = useState();
  const [item, setItem] = useState([]);
  const [balence, setBalence] = useState();
  const url = "http://localhost:1337/api/banks";

  useEffect(() => {
    async function fetchdata() {
      let res = await axios(url);
      let result = res.data;
      setData(result);
      // console.log(res);
      let newItems = data.data.map((item) => {
        let Id = item.id;

        // console.log(item.id);
        let { Name, Email, Balance } = item.attributes;
        // console.log(Img);
        return { Name, Email, Balance, Id };
      })
      // console.log(newItems);
      setItem([...newItems]);
      setBalence(item[item.length - 1].Balance)

    }
    fetchdata();
  }, [data]);
  const Formik = useFormik({
    initialValues: {
      deposit: ""
    },
    onSubmit: (values) => {
      const push = Number(balence) + Number(values.deposit);
      document.getElementById("form").reset();

      axios.put(`http://localhost:1337/api/banks/${item[item.length - 1].Id}`, {

        data:
        {
          Balance: push
        }

      }
      )
    },

    validate: (values) => {
      let errors = {};
      if (!values.deposit) errors.deposit = "Required";
      if (values.deposit !== "" && isNaN(parseFloat(values.deposit))) errors.deposit = "Just Numbers allowed";
      if (values.deposit < 0) errors.deposit = "Negative Numbers not allowed";
      return errors
    }
  })

  return (<>
    <h1 style={{ margin: "4% 0 0 33%", fontFamily: "unset", fontWeight: "bold", color: "cadetblue" }}>Deposit your Account</h1>
    <form class="row g-3" onSubmit={Formik.handleSubmit} style={{ margin: "2% 0 0 35%" }} id="form">
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Enter the amount</label>
        <input type="text" name="deposit" class="form-control" id="deposit" className="inputPassword2" placeholder="Enter the amount" onChange={Formik.handleChange} values={Formik.values.deposit} />
        {Formik.errors.deposit ? <div style={{ color: "red" }}>{Formik.errors.deposit}</div> : null}
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3" disabled={!Formik.isValid}>Deposit</button>
      </div>
    </form>
    <h2 style={{ margin: "0 0 0 35.5%" }}>Balance  is {balence}</h2>
  </>)
}