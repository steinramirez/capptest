'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcFullTrash } from 'react-icons/fc';

const AppointmentsTable = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<Date>([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments');

      if (response.status === 200) {
        const fetchedAppointments = response.data;
        setAppointments(fetchedAppointments); // Update the state with fetched appointments
      } else {
        console.error('Failed to fetch appointments.');
      }
    } catch (error) {
      console.error('Error while fetching appointments:', error);
    }
  };

  useEffect(() => {
    // Fetch appointments when the component mounts (you can also do it based on some event)
    fetchAppointments();
  }, []);
  
  useEffect(() => {
    // Fetch appointments when the component mounts (you can also do it based on some event)
    fetchAppointments();
  }, [deleteId, appointments]);

  const confirmDeleteAppointment = async () => {
    setShowConfirmation(false);
    if (deleteId !== null) {
      await deleteAppointment(deleteId); // Call deleteAppointment with deleteId after confirming deletion
    }
  };

  const cancelDeleteAppointment = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const handleDelete = (id: number) => {
    setDeleteId((prevDeleteId) => (prevDeleteId === id ? null : id));
    setShowConfirmation(true);
  };

  const deleteAppointment = async (id: number) => {
    setDeletingAppointment(id);
    try {
      const response = await axios.delete(`http://localhost:3000/appointments/${id}`);
      console.log(response.data);
      setDeletingAppointment(null); // Handle the response as needed
      fetchAppointments(); // Refresh the list of appointments after successful deletion
      // Clear the delete ID
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    } finally {
      setDeletingAppointment(null);
    }
  };

  return (
    <table className='overflow-y-auto scrollbar-hide overflow-x-hidden bg-orange-100 h-[50vh] p-4 rounded-xl flex flex-direction-column'>
      <thead className='text-center mt-3'>
        <tr>
          <th>Name</th>
          <th>Time</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='mt-10'>
      {Array.isArray(appointments) && appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td>{appointment.customerName}</td>
            <td>{appointment.appointmentTime}</td>
            <td>{appointment.appointmentDate}</td>
            <td>
              <button className='bg-blue-200 rounded-lg p-1' onClick={() => handleDelete(appointment.id)}>
                <FcFullTrash />
              </button>
            </td>
          </tr>
        ))}
          
     {showConfirmation && (
      <div className='p-5'>
        <p>Are you sure you want to delete this appointment?</p>
        <div className='h-[20px]'></div>
        <button className="w-[40px] h-[30px] bg-green-400  rounded-xl hover:bg-green-300 active:bg-green-600" onClick={confirmDeleteAppointment}>Yes</button>
        <button className="w-[40px] ml-3 h-[30px] bg-red-400  rounded-xl hover:bg-red-300 active:bg-red-600" onClick={cancelDeleteAppointment}>No</button>
      </div>
    )}
    {deletingAppointment !== null && (
      <div>
        <p>Deleting appointment...</p>
      </div>
    )}
      </tbody>
    </table>
      
);
};


export default AppointmentsTable;
