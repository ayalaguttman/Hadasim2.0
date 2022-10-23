import React, {useEffect, useState} from 'react';
import { useNavigate , useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
    patientId:"",
    firstName:"",
    lastName:"",
    city:"",
    street:"",
    building:"",
    bDate:"",
    phone:"",
    cellphone:"",
};

const AddEdit = () => {
    const[state, setState] = useState(initialState);

    const {patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate} = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/get/${id}`)
        .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!patientId || !firstName || !lastName || !city || !street || !building || !bDate || !phone || !cellphone){
            toast.error("please provide value into each input field");
        } else {
            if(!id){
                axios.post("http://localhost:3000/api/post",{
                patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate
            })
            .then(() => {
                setState({patientId:"", firstName:"", lastName:"", city:"", street:"", building:"", bDate:"", phone:"", cellphone:"",firstVaccinationDate:"", secondVaccinationDate:"", thirdVaccinationDate:"", fourthVaccinationDate:"", vaccineManufacturer:"", positiveResultDate:"", negativeResultDate:""})
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Patient Added Successfully")
            } else {
                axios.put(`http://localhost:3000/api/update/${id}`,{
                patientId, firstName, lastName, city, street, building, bDate, phone, cellphone,firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate
            })
            .then(() => {
                setState({patientId:"", firstName:"", lastName:"", city:"", street:"", building:"", bDate:"", phone:"", cellphone:"",firstVaccinationDate:"", secondVaccinationDate:"", thirdVaccinationDate:"", fourthVaccinationDate:"", vaccineManufacturer:"", positiveResultDate:"", negativeResultDate:""})
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Patient Updates Successfully")
            }
            
            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState({...state,[name]:value})
    }
  return (
    <div style={{marginTop:"100px"}}>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor="patientId">ID</label>
            <input
            type="text"
            id="patientId"
            name="patientId"
            placeholder="id"
            value={patientId || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="firstName">First Name</label>
            <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="lastName">Last Name</label>
            <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={lastName || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="city">City</label>
            <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={city || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="Street">Street</label>
            <input
            type="text"
            id="street"
            name="street"
            placeholder="Street"
            value={street || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="building">Building</label>
            <input
            type="number"
            id="building"
            name="building"
            placeholder="Building"
            value={building || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="bDate">Birth Date</label>
            <input
            type="date"
            id="bDate"
            name="bDate"
            placeholder="Birth Date"
            value={bDate || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="phone">Phone</label>
            <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={phone || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="cellphone">CellPhone</label>
            <input
            type="text"
            id="cellphone"
            name="cellphone"
            placeholder="CellPhone"
            value={cellphone || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="FirstVaccinationDate">FirstVaccinationDate</label>
            <input
            type="date"
            id="firstVaccinationDate"
            name="firstVaccinationDate"
            placeholder="FirstVaccinationDate"
            value={firstVaccinationDate || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="secondVaccinationDate">SecondVaccinationDate</label>
            <input
            type="date"
            id="secondVaccinationDate"
            name="secondVaccinationDate"
            placeholder="SecondVaccinationDate"
            value={secondVaccinationDate || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="thirdVaccinationDate">ThirdVaccinationDate</label>
            <input
            type="date"
            id="thirdVaccinationDate"
            name="thirdVaccinationDate"
            placeholder="ThirdVaccinationDate"
            value={thirdVaccinationDate || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="fourthVaccinationDate">FourthVaccinationDate</label>
            <input
            type="date"
            id="fourthVaccinationDate"
            name="fourthVaccinationDate"
            placeholder="FourthVaccinationDate"
            value={fourthVaccinationDate || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="vaccineManufacturer">VaccineManufacturer</label>
            <input
            type="text"
            id="vaccineManufacturer"
            name="vaccineManufacturer"
            placeholder="VaccineManufacturer"
            value={vaccineManufacturer || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="positiveResultDate">PositiveResultDate</label>
            <input
            type="date"
            id="positiveResultDate"
            name="positiveResultDate"
            placeholder="PositiveResultDate"
            value={positiveResultDate || ""}
            onChange={handleInputChange}
            />
            <br/>
            <label htmlFor="negativeResultDate">NegativeResultDate</label>
            <input
            type="date"
            id="negativeResultDate"
            name="negativeResultDate"
            placeholder="NegativeResultDate"
            value={negativeResultDate || ""}
            onChange={handleInputChange}
            />
            <br/>
            <input type="submit" value={ id ? "Update" : "Save" }/>
            <br/>
            <Link to="/">
                <input type="button" value="Go Back" />
            </Link>
        </form>
      
    </div>
  )
}

export default AddEdit
