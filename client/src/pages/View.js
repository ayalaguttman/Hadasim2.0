import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

const View = () => {
    const [patient, setPatient] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/get/${id}`)
        .then((resp) => setPatient({ ...resp.data[0] }));
    },[id]);

  return (
    <div style={{marginTop: "150px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>Patient Information</p>
            </div>
            <div className='container'>
                <strong>ID:</strong>
                <span>{id}</span>
                <br/>
                <br/>
                <strong>First Name:</strong>
                <span>{patient.firstName}</span>
                <br/>
                <br/>
                <strong>Last Name:</strong>
                <span>{patient.lasttName}</span>
                <br/>
                <br/>
                <strong>City:</strong>
                <span>{patient.city}</span>
                <br/>
                <br/>
                <strong>Street:</strong>
                <span>{patient.street}</span>
                <br/>
                <br/>
                <strong>Building:</strong>
                <span>{patient.building}</span>
                <br/>
                <br/>
                <strong>Birth Date:</strong>
                <span>{patient.bDate}</span>
                <br/>
                <br/>
                <strong>Phone:</strong>
                <span>{patient.phone}</span>
                <br/>
                <br/>
                <strong>CellPhone:</strong>
                <span>{patient.cellphone}</span>
                <br/>
                <br/>
                <Link to="/">
                <button>Go Back</button>
                </Link>
            </div>

        </div>
      
    </div>
  )
}

export default View
