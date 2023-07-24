"use client"
import React, { useState} from 'react';
import axios from 'axios';
import AppointmentsTable from '../components/AppointmentsTable';

interface Appointment {
  id: number; // Or number, depending on the type of your IDs
  customerName: string;
  appointmentTime: string;
  appointmentDate: string;
}
export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments');
  
      if (response.status === 200) {
        // Assuming your server returns an array of appointments in the response data
        const appointments = response.data;
        // Update the state or perform any other actions with the appointments data
        // For example, you might have a state variable to store the appointments:
        // setAppointments(appointments);
      } else {
        console.error('Failed to fetch appointments.');
      }
    } catch (error) {
      console.error('Error while fetching appointments:', error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/appointments', {
        customerName,
        appointmentTime,
        appointmentDate,
      });
      
      if (response.status === 201) {
        setMessage(response.data.message);
        setCustomerName('');
        setAppointmentTime('');
        setAppointmentDate('');
       await fetchAppointments(); // Refresh the list of appointments after successful creation
      } else {
        setMessage('Appointment set!.');
      }
    } catch (error) {
      setMessage('Failed to set the appointment.');
    }
  };

  return (
    <>
    <div className='Form hv-[90hv]'>
      <form onSubmit={handleSubmit}>
        <label >
          <a>Customer Name:</a><br/>
          <input className='box-shadow-multiple-colors'
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <a>Appointment Date:</a><br/>
          <input 
          className='box-shadow-multiple-colors'
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)} required
          /><br />
          <input className='box-shadow-multiple-colors'
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)} required
          />
        </label>
        <br />
        <button className='font-weight-bold bg-blue-100 p-3 rounded-lg hover:bg-blue-300 active:bg-green-400' type="submit">Submit</button>

        <div>

        </div>
      </form>
      {message && <p>{message}</p>}

     <AppointmentsTable />

      <div>

      </div>
    </div>
    </>
  );
}