const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')



app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "password",
  database: 'patient_info'
})

app.listen(3001, () => console.log('Server Started'));

app.get("/api/get", (req, res) => {
  const sqlGet = 'SELECT * FROM personal_info';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  })
})

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = 'select * from (SELECT * FROM patient_info.personal_info INNER JOIN patient_info.covid_info ON personal_info.patientId = covid_info.patientCId ) AS allDetails where allDetails.patientId = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  })
})

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate } = req.body;
  const sqlUpdatePersonal = 'UPDATE personal_info SET patientId =?, firstName =?, lastName =?, city =?, street =?, building =?, bDate =?, phone =?, cellphone =? WHERE patientId =?';
  const sqlUpdateCovid = 'UPDATE covid_info SET firstVaccinationDate =?, secondVaccinationDate =?, thirdVaccinationDate =?, fourthVaccinationDate =?, vaccineManufacturer =?, positiveResultDate =?, negativeResultDate =? WHERE patientCId =?';

  db.query(sqlUpdatePersonal, [patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, patientId], (error, result) => {
    if (error) {
      console.log(error);
    }
    
  })
  db.query(sqlUpdateCovid, [firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate, patientId], (error, result) => {
    if (error) {
      console.log(error);
    }

  })
})

app.post("/api/post", (req, res) => {
  const { patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate } = req.body;
  const sqlInsertPersonal = 'INSERT INTO personal_info (patientId, firstName, lastName, city, street, building, bDate, phone, cellphone) VALUES ( ?,?,?,?,?,?,?,?,?)';
  const sqlInsertCovid = 'INSERT INTO covid_info (firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate, patientCId) VALUES ( ?,?,?,?,?,?,?,?)';

  db.query(sqlInsertPersonal, [patientId, firstName, lastName, city, street, building, bDate, phone, cellphone], (error, result) => {
    if (error) {
      console.log(error);
    }
  })
  db.query(sqlInsertCovid, [firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate, patientId], (error, result) => {
    if (error) {
      console.log(error);
    }
  })

})

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = 'DELETE t1, t2 FROM patient_info.personal_info t1 LEFT JOIN patient_info.covid_info t2 ON t1.patientId = t2.patientCId WHERE t1.patientId = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  })
})
app.get("/", (req, res) => {
  res.send("Hello Express");
})

