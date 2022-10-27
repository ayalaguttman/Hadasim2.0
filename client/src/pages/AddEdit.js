import React,  { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';


const initialState = {
    patientId: "",
    firstName: "",
    lastName: "",
    city: "",
    street: "",
    building: "",
    bDate: "",
    phone: "",
    cellphone: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patientId || !firstName || !lastName || !city || !street || !building || !bDate || !phone || !cellphone) {
            toast.error("please provide value into each input field");
        } else {
            if (!id) {
                axios.post("http://localhost:3001/api/post", {
                    patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate
                })
                    .then(() => {
                        setState({ patientId: "", firstName: "", lastName: "", city: "", street: "", building: "", bDate: "", phone: "", cellphone: "", firstVaccinationDate: "", secondVaccinationDate: "", thirdVaccinationDate: "", fourthVaccinationDate: "", vaccineManufacturer: "", positiveResultDate: "", negativeResultDate: "" })
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Patient Added Successfully")
            } else {
                axios.put(`http://localhost:3001/api/update/${id}`, {
                    patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate
                })
                    .then(() => {
                        setState({ patientId: "", firstName: "", lastName: "", city: "", street: "", building: "", bDate: "", phone: "", cellphone: "", firstVaccinationDate: "", secondVaccinationDate: "", thirdVaccinationDate: "", fourthVaccinationDate: "", vaccineManufacturer: "", positiveResultDate: "", negativeResultDate: "" })
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Patient Updates Successfully")
            }

            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    } 
    

    return (
        <div class="container">
            <form onSubmit={handleSubmit}>
                <h2>Please fill the details below:</h2>
            <h3>-personal details-</h3>
            <br/>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="patientId">ID</label>
                        <input
                            class="form-control"
                            type="text"
                            id="patientId"
                            name="patientId"
                            placeholder="id"
                            value={patientId || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-4">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            class="form-control"
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div class="form-group col-md-4">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            class="form-control"
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="bDate">Birth Date</label>
                        <input
                            class="form-control"
                            type="text"
                            id="bDate"
                            name="bDate"
                            placeholder="yyyy-mm-dd"
                            value={bDate || ""}
                            onChange={handleInputChange}
                        />

                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-md-4">

                        <label htmlFor="city">City</label>
                        <input
                            class="form-control"
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            value={city || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="Street">Street</label>
                        <input
                            class="form-control"
                            type="text"
                            id="street"
                            name="street"
                            placeholder="Street"
                            value={street || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="building">Building</label>
                        <input
                            class="form-control"
                            type="number"
                            id="building"
                            name="building"
                            placeholder="Building"
                            value={building || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="phone">Phone</label>
                        <input
                            class="form-control"
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            value={phone || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="cellphone">CellPhone</label>
                        <input
                            class="form-control"
                            type="text"
                            id="cellphone"
                            name="cellphone"
                            placeholder="CellPhone"
                            value={cellphone || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>
                <h3>-Covid details-</h3>
                <div class="row">
                    <div class="form-group col-md-3">
                        <label htmlFor="FirstVaccinationDate">FirstVaccinationDate</label>
                        <input
                            class="form-control"
                            type="text"
                            id="firstVaccinationDate"
                            name="firstVaccinationDate"
                            placeholder="yyyy-mm-dd"
                            value={firstVaccinationDate || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label htmlFor="secondVaccinationDate">SecondVaccinationDate</label>
                        <input
                            class="form-control"
                            type="text"
                            id="secondVaccinationDate"
                            name="secondVaccinationDate"
                            placeholder="yyyy-mm-dd"
                            value={secondVaccinationDate || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label htmlFor="thirdVaccinationDate">ThirdVaccinationDate</label>
                        <input
                            class="form-control"
                            type="text"
                            id="thirdVaccinationDate"
                            name="thirdVaccinationDate"
                            placeholder="yyyy-mm-dd"
                            value={thirdVaccinationDate || ""}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div class="form-group col-md-3">
                        <label htmlFor="fourthVaccinationDate">FourthVaccinationDate</label>
                        <input
                            class="form-control"
                            type="text"
                            id="fourthVaccinationDate"
                            name="fourthVaccinationDate"
                            placeholder="yyyy-mm-dd"
                            value={fourthVaccinationDate || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>

                <div class="form-group col-md-4">
                    <label htmlFor="vaccineManufacturer">VaccineManufacturer</label>
                    <select
                        class="form-control"
                        name="vaccineManufacturer"
                        id="vaccineManufacturer"
                        
                        value={vaccineManufacturer || ""}
                        onChange={handleInputChange}>
                        <option value="Moderna">Moderna</option>
                        <option value="Pfizer">Pfizer</option>
                        
                    </select>
                
                </div>
                <div class="row">
                <div class="form-group col-md-6">
                <label htmlFor="positiveResultDate">PositiveResultDate</label>
                <input
                    class="form-control"
                    type="text"
                    id="positiveResultDate"
                    name="positiveResultDate"
                    placeholder="yyyy-mm-dd"
                    value={positiveResultDate || ""}
                    onChange={handleInputChange}
                />
                </div>
                <div class="form-group col-md-6">
                <label htmlFor="negativeResultDate">NegativeResultDate</label>
                <input
                    class="form-control"
                    type="text"
                    id="negativeResultDate"
                    name="negativeResultDate"
                    placeholder="yyyy-mm-dd"
                    value={negativeResultDate || ""}
                    onChange={handleInputChange}
                />
                </div>
                </div>
               <br/>
                <input type="submit" class="btn btn-success" value={id ? "Update" : "Save"} />
                <br />
                <br />
                <Link to="/">
                    <input type="button" class="btn btn-secondary" value="Go Back" />
                </Link>
                

            </form>

        </div>
    )
}

export default AddEdit
