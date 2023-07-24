
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcFullTrash } from "react-icons/fc";




const AppointmentsTable = ({ }) => {
  

  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

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

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDeleteAppointment = async () => {
    setShowConfirmation(false);
    setConfirmDelete(true);
    await deleteAppointment(deleteId); // Call deleteAppointment with deleteId after confirming deletion
  };
  const cancelDeleteAppointment = () => {
    setShowConfirmation(false);
    setDeleteId(null);
    setConfirmDelete(false);
  };

  const deleteAppointment = async (id) => {
    setDeletingAppointment(id);
    try {
      const response = await axios.delete(`http://localhost:3000/appointments/${deleteId}`);
      console.log(response.data);
      setDeletingAppointment(null); //Handle the response as needed
      fetchAppointments(); // Refresh the list of appointments after successful deletion
      // Clear the delete ID
      setConfirmDelete(false);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    } finally {
      setDeletingAppointment(null);
    }
  };
  return (
    <>
      <table className='overflow-y-auto overflow-x-hidden bg-orange-100 h-200px rounded-xl flex flex-direction-column'>

        <thead className=' text-center '>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.customerName}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.appointmentDate}</td>
              <td>
                <button className='bg-blue-200 rounded-lg p-1' onClick={() => handleDelete(appointment.id)}><FcFullTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this appointment?</p>
          <button onClick={confirmDeleteAppointment}>Yes</button>
          <button onClick={cancelDeleteAppointment}>No</button>
        </div>
      )}
      {deletingAppointment !== null && (
        <div>
          <p>Deleting appointment...</p>
        </div>
      )}
    </>
  );
};

export default AppointmentsTable;