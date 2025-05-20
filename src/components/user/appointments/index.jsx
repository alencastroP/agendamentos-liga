import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: rgb(254, 254, 255);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  max-width: 90%;
`;

const ModalTitle = styled.h2`
  font-size: 1.4rem;
  color: rgb(0, 0, 0);
  margin-bottom: 1rem;
  font-weight: 700;
`;

const AppointmentList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const AppointmentCard = styled.article`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  user-select: none;

  &:hover {
    box-shadow: 0 6px 20px rgba(255, 58, 107, 0.2);
  }
`;

const AppointmentDetails = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const MarkAttendedButton = styled.button`
  background-color: #ff3a6b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e63946;
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #ff3a6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e63946;
  }
`;

function UserAppointmentModal({ onClose }) {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('loggedUser')) || {};
  useEffect(() => {
    if (!user?.id) return;
    fetch(`http://localhost:3000/atendimentos?pacienteId=${user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na resposta: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const filteredAppointments = data.filter(appointment => !appointment.atendido);
        setAppointments(filteredAppointments);
      })
      .catch((err) => console.error('Erro ao buscar agendamentos:', err));
  }, [user?.id]);

  const handleMarkAttended = (id) => {
    fetch(`http://localhost:3000/atendimentos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ atendido: true }),
    })
      .then((res) => {
        if (res.ok) {
          setAppointments((prev) =>
            prev.filter((appointment) => appointment.id !== id)
          );
        } else {
          console.error('Erro na resposta:', res.status);
        }
      })
      .catch((err) => console.error('Erro ao marcar como atendido:', err));
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Seus Agendamentos</ModalTitle>
        <AppointmentList>
          {appointments.length === 0 ? (
            <p>Sem consultas agendadas.</p>
          ) : (
            appointments.map(({ id, medico, dataAtendimento, hora, especialidadeNome }) => (
              <AppointmentCard key={id}>
                <AppointmentDetails>
                  Médico: {typeof medico === 'string' ? medico : 'Informação inválida'}
                </AppointmentDetails>
                <AppointmentDetails>
                  Data: {dataAtendimento ? new Date(dataAtendimento).toLocaleDateString('pt-BR') : 'Data inválida'}
                </AppointmentDetails>
                <AppointmentDetails>
                  Horário: {typeof hora === 'string' ? hora : 'Horário inválido'}
                </AppointmentDetails>
                <AppointmentDetails>
                  Especialidade: {typeof especialidadeNome === 'string' ? especialidadeNome : 'Especialidade inválida'}
                </AppointmentDetails>
                <MarkAttendedButton onClick={() => handleMarkAttended(id)}>
                  Marcar como Atendido
                </MarkAttendedButton>
              </AppointmentCard>
            ))
          )}
        </AppointmentList>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default UserAppointmentModal;
