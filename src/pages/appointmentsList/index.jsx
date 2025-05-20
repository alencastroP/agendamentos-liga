import React from 'react';
import Header from '../../components/header/index.jsx';
import DoctorsList from '../../components/appointments/doctorList/index.jsx';

function AppointmentList() {
    return (
        <>
            <Header />
            <DoctorsList></DoctorsList>
        </>
    );
}

export default AppointmentList;
