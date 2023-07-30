"use client"
import React, { useState } from 'react';
import axios from 'axios';
import  DatePicker  from 'react-datepicker'
import { subDays, addDays } from 'date-fns'
import AppointmentsTable from '../components/AppointmentsTable';
import 'react-datepicker/src/stylesheets/datepicker.scss'

interface Appointment {
  id: number; // Or number, depending on the type of your IDs
  customerName: string;
  appointmentTime: string;
  appointmentDate: string;
}
export default function Home() {
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState();
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');

  const HandleDateChange = (date) => {
    const day = date.getDate();
    const month = date.getMonth()+1;
    setAppointmentDate(date);
  }
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
        setTimeout(()=>{setMessage('')}, 3000)
      }
    } catch (error) {
      setMessage('Failed to set the appointment.');
    }
  };

  return (
    <>
    <div className='Form'>
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
        <DatePicker
        dateFormat="dd/MM/yyyy"
      selected={appointmentDate}
      onChange={HandleDateChange}
      excludeDateIntervals={[
        { start: (new Date() , 1 ), end: subDays(new Date(), 1) },
      ]}
      placeholderText="Select a date other than today or yesterday"
    /><br />
         {/*  <input className='box-shadow-multiple-colors'
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)} required
          /> */}
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