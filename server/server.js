const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')


//const { once } = require('nodemon')
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "password",
  database: 'patient_info'
})

app.listen(3000, () => console.log('Server Started'));

app.get("/api/get", (req, res) => {
  const sqlGet = 'SELECT * FROM personal_info';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  })
})

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM personal_info WHERE patientId =?';
  db.query(sqlGet, id, (error, result) => {
    if(error){
      console.log(error);
    }
    res.send(result);
  })
})

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const {patientId, firstName, lastName, city, street, building, bDate, phone, cellphone} = req.body;
  const sqlUpdate = 'UPDATE personal_info SET patientId =?, firstName =?, lastName =?, city =?, street =?, building =?, bDate =?, phone =?, cellphone =? WHERE patientId =?';
  db.query(sqlUpdate, [patientId, firstName, lastName, city, street, building, bDate, phone, cellphone, patientId], (error, result) => {
    if(error){
      console.log(error);
    }
    res.send(result);
  })
})

app.post("/api/post", (req, res) => {
  const {patientId, firstName, lastName, city, street, building, bDate, phone, cellphone,firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate} = req.body;
  const sqlInsertPersonal = 'INSERT INTO personal_info (patientId, firstName, lastName, city, street, building, bDate, phone, cellphone) VALUES ( ?,?,?,?,?,?,?,?,?)';
  const sqlInsertCovid = 'INSERT INTO covid_info (firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate, patientId) VALUES ( ?,?,?,?,?,?,?,?,?)';

  db.query(sqlInsertPersonal,[patientId, firstName, lastName, city, street, building, bDate, phone, cellphone], (error, result) =>{
    if(error){
      console.log(error);
    }
  })
  db.query(sqlInsertCovid,[firstVaccinationDate, secondVaccinationDate, thirdVaccinationDate, fourthVaccinationDate, vaccineManufacturer, positiveResultDate, negativeResultDate, patientId], (error, result) =>{
    if(error){
      console.log(error);
    }
  })
  
})

app.delete("/api/remove/:id", (req, res) => {
  const {id} = req.params;
  const sqlRemove = 'DELETE FROM personal_info WHERE patientId = ?';
  db.query(sqlRemove, id, (error, result) =>{
    if(error){
      console.log(error);
    }
  })
})
app.get("/", (req, res) => {
  res.send("Hello Express");
})


// db.query(
//   'SELECT * FROM personal_info',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// )
// db.query(
//   'INSERT INTO personal_info (patientId, firstName, lastName, city, street, building, bDate, phone, cellphone) VALUES ( ?,?,?,?,?,?,?,?,?)', [314886774, 'ayala', 'weingarten', 'bnei-braq', 'genehovsky', 10, 1999 - 08 - 17, 36190997, 548540433],
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//     console.log(err);
//   }
// )
// db.query(
//   'UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//     console.log(err);
//   }
// )
// db.query(
//   'DELETE FROM personal_info WHERE firstName =?', ['ayala'],
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//     console.log(err);
//   }
// )



//db.on('error', (error) => console.error(error))
//db.once('open', () => console.log('Connected to Database'))
