import React ,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";


function Home() {
  const [patientInfo, setPatientInfo] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
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
        axios.delete(`http://localhost:3001/api/remove/${id}`);
        toast.success("Patient Deleted Successfully");
        setTimeout(() => loadData(), 500);
      }
  }
  return (
    <div className='container' style={{marginTop:"50px"}}>
      <div class="row">
        <div class="col-md-6">
        <h2>patients</h2>
        </div>
        <div class="col-md-6">
        <Link to="/addPatient">
        <button type="button" class="btn btn-primary">Add patient</button>
        </Link>
        </div>

      </div>
      <br/>
     
      
        <table class="table">
          <thead>
            <tr>
            <th scope="col" style={{textAlign:"center"}}>.no</th>
              <th scope="col" style={{textAlign:"center"}}>id</th>
              <th scope="col" style={{textAlign:"center"}}>First name</th>
              <th scope="col" style={{textAlign:"center"}}>Last name</th>
              <th scope="col"style={{textAlign:"center"}}>Action</th>
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
                  <td >
                    <Link to={`/update/${item.patientId}`}>
                      <button type="button" class="btn btn-outline-primary">Edit</button>
                    </Link>
                    <Link>
                      <button type="button" class="btn btn-outline-danger" onClick={() => deletPatient(item.patientId)}>Delete</button>
                    </Link>
                    <Link to={`/view/${item.patientId}`}>
                      <button type="button" class="btn btn-outline-info"> view details</button>
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
