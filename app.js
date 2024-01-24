// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');



const app = express();
const port = 3000;

app.use(cors());
// Create a connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'welcome@123',
  database: 'your_database_name',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
  
      // Create the database if it does not exist
      db.query('CREATE DATABASE IF NOT EXISTS your_database_name', (error) => {
        if (error) {
          console.error('Error creating database:', error);
        } else {
          console.log('Database created or already exists');
          // Switch to the database
          db.query('USE your_database_name');
          // Create a table if it does not exist
          createTable();
        }
      });
    }
  });
  
  // Function to create the 'form_data' table
  function createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS form_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL
      )
    `;
  
    db.query(createTableQuery, (error) => {
      if (error) {
        console.error('Error creating table:', error);
      } else {
        console.log('Table created or already exists');
      }
    });
  }
  


// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.json());

app.post('/submitFormData', (req, res) => {
  const { name, email, phone } = req.body;
    console.log('req.body', req.body)
  const sql = 'INSERT INTO form_data (name, email, phone) VALUES (?, ?, ?)';
  console.log('sql', sql)
  db.query(sql, [name, email, phone], (error, results) => {
    if (error) {
      console.error('Error inserting data into database:', error);
      res.json({ success: false, error: 'Error submitting form data' });
    } else {
      console.log('Form data inserted successfully');
      res.json({ success: true });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
