import React from 'react';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import Appointment from '../../components/appointment/calendar/index.jsx';
import styled from 'styled-components';


const Background = styled.div`
  background-color: #f5f7fa;
  width: 100%;
  heigth: 100%;
  min-height: 100vh;
`

function AppointmentList() {
    return (
        <>
            <Background>
            <Header></Header>
            <Appointment />
            </Background>
            <Footer></Footer>
        </>
    );
}

export default AppointmentList;
