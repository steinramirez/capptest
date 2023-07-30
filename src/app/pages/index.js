'use client'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());
console.log(bodyParser.json())
app.use(cors());

// Replace with your SQLite database connection
const db = new sqlite3.Database('appointments.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS AppointmentSetters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT NOT NULL,
        appointmentTime TEXT NOT NULL,
        appointmentDate TEXT NOT NULL
      )
    `);
  }
});

// Add an appointment

app.post('/appointments', async (req , res ) => {
  const { customerName, appointmentTime, appointmentDate } = req.body;

  try {
    const query = 'INSERT INTO AppointmentSetters (customerName, appointmentTime, appointmentDate) VALUES (?, ?, ?)';
    db.run(query, [customerName, appointmentTime, appointmentDate], function ( err ) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to set the appointment.' });
      } else {
        // This.lastID is the ID of the last inserted row (if auto-incremented)
        res.status(200).json({ message: 'Appointment set successfully.'});
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while processing the request.' });
  }
});
  
app.delete('/appointments/:id', (req , res ) => {
  db.run('DELETE FROM AppointmentSetters WHERE id = ?', [req.params.id], (err ) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete appointment.' });
    } else {
      res.status(204).json({ message: 'Appointment deleted successfully.' });
    }
  });
});

app.get('/appointments', (req, res) => {
  db.all('SELECT * FROM AppointmentSetters', (err,  rows ) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch appointments.' });
    } else {
      res.status(200).json(rows);
    }
  });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
