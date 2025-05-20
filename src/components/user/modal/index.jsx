import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: rgb(254, 254, 255);
  padding: 14px 28px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  max-width: 90%;
`;

const InfoContainer = styled.div`
  margin-top: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1.6rem;
`;

const Input = styled.input`
  width: 93%;
  padding: 10px;
  margin-top: 8px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: #f5f7fa;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #FF3A6B;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 58, 107, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: #f5f7fa;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #FF3A6B;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 58, 107, 0.5);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const SaveButton = styled.button`
  padding: 14px 12px;
  background-color: #FF3A6B; /* Cor do botão de salvar */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e63946; /* Cor ao passar o mouse */
  }
`;

const CloseButton = styled.button`
  padding: 14px 12px;
  background-color: rgb(252, 211, 221); /* Cor do botão de fechar */
  color: #e63946;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(236, 152, 159); /* Cor ao passar o mouse */
  }
`;

function Modal({ onClose }) {
  const user = JSON.parse(localStorage.getItem('loggedUser')) || {};
  const [formData, setFormData] = useState({
    paciente: user.paciente || '',
    email: user.email || '',
    convenio: user.convenio || ''
  });

  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/convenios')
      .then(res => res.json())
      .then(data => {
        setConvenios(data);
      })
      .catch(err => console.error('Erro ao buscar convênios:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/pacientes/${formData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          alert('Dados atualizados com sucesso!');
          onClose();
        } else {
          alert('Erro ao atualizar os dados.');
        }
      })
      .catch(err => console.error('Erro:', err));
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <InfoContainer>
          <Title>Seus dados:</Title>
          <InfoItem>
            <strong>Nome:</strong>
            <Input
              type="text"
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
            />
          </InfoItem>
          <InfoItem>
            <strong>E-mail:</strong>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </InfoItem>
          <InfoItem>
            <strong>Convênio:</strong>
            <Select
              name="convenio"
              value={formData.convenio}
              onChange={handleChange}
            >
              <option value="">Selecione um convênio</option>
              {convenios.map((convenio) => (
                <option key={convenio.id} value={convenio.nome}>{convenio.nome}</option>
              ))}
            </Select>
          </InfoItem>
        </InfoContainer>
        <ButtonContainer>
          <SaveButton onClick={handleSave}>Salvar</SaveButton>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default Modal;
