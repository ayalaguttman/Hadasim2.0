import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

const View = () => {
    const [patient, setPatient] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/get/${id}`)
        .then((resp) => setPatient({ ...resp.data[0] }));
    },[id]);

  return (
    <div style={{marginTop: "50px"}}>
        <div className='card'>
            <div className='card-header'>
                <h2>Patient Information</h2>
            </div>
            <div className='container'>
                <strong>ID : </strong>
                <span>{id}</span>
                <br/>
                <br/>
                <strong>First Name : </strong>
                <span>{patient.firstName}</span>
                <br/>
                <br/>
                <strong>Last Name : </strong>
                <span>{patient.lasttName}</span>
                <br/>
                <br/>
                <strong>City : </strong>
                <span>{patient.city}</span>
                <br/>
                <br/>
                <strong>Street : </strong>
                <span>{patient.street}</span>
                <br/>
                <br/>
                <strong>Building : </strong>
                <span>{patient.building}</span>
                <br/>
                <br/>
                <strong>Birth Date : </strong>
                <span>{patient.bDate}</span>
                <br/>
                <br/>
                <strong>Phone : </strong>
                <span>{patient.phone}</span>
                <br/>
                <br/>
                <strong>CellPhone : </strong>
                <span>{patient.cellphone}</span>
                <br/>
                <br/>
                <strong>firstVaccinationDate : </strong>
                <span>{patient.firstVaccinationDate}</span>
                <br/>
                <br/>
                <strong>secondVaccinationDate : </strong>
                <span>{patient.secondVaccinationDate}</span>
                <br/>
                <br/>
                <strong>thirdVaccinationDate : </strong>
                <span>{patient.thirdVaccinationDate}</span>
                <br/>
                <br/>
                <strong>fourthVaccinationDate : </strong>
                <span>{patient.fourthVaccinationDate}</span>
                <br/>
                <br/>
                <strong>vaccineManufacturer : </strong>
                <span>{patient.vaccineManufacturer}</span>
                <br/>
                <br/>
                <strong>positiveResultDate : </strong>
                <span>{patient.positiveResultDate}</span>
                <br/>
                <br/>
                <strong>negativeResultDate : </strong>
                <span>{patient.negativeResultDates}</span>
                <br/>
                <br/>
                <Link to="/">
                <button class="btn btn-secondary">Go Back</button>
                </Link>
                
            </div>

        </div>
      
    </div>
  )
}

export default View
