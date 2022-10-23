import React ,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
//import ".Home.css";

function Home() {
  const [patientInfo, setPatientInfo] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3000/api/get");
    setPatientInfo(response.data);
    console.log('done');
  }

  useEffect(() => {
    loadData();
  }, []);

  const deletPatient = (id) =>{
    if(
      window.confirm("Are you sure that you want to delete that patient ?")
      ){
        axios.delete(`http://localhost:3000/api/remove/${id}`);
        toast.success("Patient Deleted Successfully");
        setTimeout(() => loadData(), 500);
      }
  }
  return (
    <div  style={{marginTop:"150px"}}>
        <h2>Home</h2>
        <h2>patient info</h2>
        <Link to="/addPatient">
        <button>Add patient</button>
        </Link>
        <table className='styled-table'>
          <thead>
            <tr>
            <th style={{textAlign:"center"}}>.no</th>
              <th style={{textAlign:"center"}}>id</th>
              <th style={{textAlign:"center"}}>First name</th>
              <th style={{textAlign:"center"}}>Last name</th>
              <th style={{textAlign:"center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {patientInfo.map((item, index) =>{
              return(
                <tr key={item.patientId}>
                  <th scope="row">{index+1}</th>
                  <td>{item.patientId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>
                    <Link to={`/update/${item.patientId}`}>
                      <button>Edit</button>
                    </Link>
                    
                      <button onClick={() =>deletPatient(item.patientId)}>Delete</button>
                    
                    <Link to={`/view/${item.patientId}`}>
                      <button>view details</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
    </div>
  )
}

export default Home
