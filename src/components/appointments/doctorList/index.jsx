import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';

const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
  min-height: 0;
  background-color: #f5f7fa;
  color: #222;
  font-family: 'Inter', sans-serif;
  user-select: none;
  
  @media (max-width: 840px) {
    flex-direction: column;
    height: auto;
  }
`;

const Sidebar = styled.aside`
  width: 300px;
  background-color: white;
  border-right: 1px solid #ddd;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  @media (max-width: 840px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding: 1rem 1.5rem;
    max-height: 280px;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
  font-weight: 700;
  user-select: text;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0.7rem 0 0.1rem 0;
  user-select: text;
  padding: 10px;
`;

const CardContainer = styled.div`
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 245px;
  padding: 0.7rem 0.75rem;
  font-size: 1rem;
  border: 1.8px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #FF3A6B;
    outline: none;
    box-shadow: 0 0 8px #FF3A6B;
  }
`;

const Select = styled.select`
  width: 100%;
  max-width: 275px;
  padding: 0.7rem 0.75rem;
  font-size: 1rem;
  border: 1.8px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #FF3A6B;
    outline: none;
    box-shadow: 0 0 8px #FF3A6B;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;

  @media (max-width: 840px) {
    padding: 1rem 1.5rem;
    height: calc(100vh - 300px);
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  user-select: text;
  color: rgb(0, 0, 0);
  font-weight: 700;
`;

const DoctorList = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  min-height: 0;
`;

const DoctorCard = styled.article`
  background: white;
  border-radius: 16px;
  padding: 2rem 2.2rem 2rem;
  box-shadow: 0 6px 20px rgb(255 58 107 / 0.12);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;

  &:hover, &:focus-within {
    box-shadow: 0 8px 12px rgb(255 58 107 / 0.3);
    outline: none;
  }
`;

const DoctorName = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  color: #222;
  margin-bottom: 0.25rem;
`;

const DoctorSpecialty = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #FF3A6B;
  margin-bottom: 0.75rem;
`;

const DoctorAvailability = styled.div`
  font-size: 0.95rem;
  color: #555;
  user-select: text;
`;

function DoctorsList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    medico: '',
    especialidadeNome: '',
    data: '',
    convenioNome: ''
  });

  const [doctorsData, setDoctorsData] = useState([]);

useEffect(() => {
  fetch('http://localhost:3000/medicos')
    .then(res => res.json())
    .then(data => {
      setDoctorsData(data);
    })
    .catch(err => console.error('Erro ao buscar médicos:', err));
}, []);


  const specialties = useMemo(() => {
    const unique = new Set(doctorsData.map(doc => doc.especialidadeNome));
    return Array.from(unique).sort();
  }, [doctorsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectDoctor = (id) => {
    navigate(`/agendamento/${id}`);
  };

  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/convenios')
      .then(res => res.json())
      .then(data => setConvenios(data))
      .catch(err => console.error('Erro ao buscar convênios:', err));
  }, []);

const filteredDoctors = useMemo(() => {
  return doctorsData.filter(doc => {
    const matchName = doc.medico && doc.medico.toLowerCase().includes(filters.medico.toLowerCase());
    const matchSpecialty = filters.especialidadeNome ? doc.especialidadeNome === filters.especialidadeNome : true;
    const matchDate = filters.data ? 
      doc.disponibilidade.some(d => d.data === filters.data) : true; 
    const matchConvenio = filters.convenioNome ? 
      doc.convenios.includes(filters.convenioNome) : true;

    return matchName && matchSpecialty && matchDate && matchConvenio;
  });
}, [filters, doctorsData]);



  return (
    <SidebarContainer>
      <Sidebar>
        <SidebarTitle>Filtros</SidebarTitle>

        <CardContainer>
          <div>
            <Label>Nome</Label>
            <Input
              type="text"
              id="filter-name"
              name="medico"
              placeholder="Digite o nome do médico"
              value={filters.medico}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>

          <div>
            <Label>Especialidade</Label>
            <Select
              id="filter-specialty"
              name="especialidadeNome"
              value={filters.especialidadeNome}
              onChange={handleInputChange}
            >
              <option value="">Todas</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Data disponível</Label>
            <Input
              type="date"
              id="filter-date"
              name="data"
              value={filters.data}
              onChange={handleInputChange}
              min="2024-01-01"
              max="2025-12-31"
            />
          </div>

          <div>
            <Label>Convênio</Label>
            <Select
              id="filter-convenio"
              name="convenioNome"
              value={filters.convenioNome}
              onChange={handleInputChange}
            >
              <option value="">Todos</option>
              {Array.isArray(convenios) && convenios.map((convenio) => (
                <option key={convenio.nome} value={convenio.nome}>{convenio.nome}</option>
              ))}
            </Select>
          </div>
        </CardContainer>
      </Sidebar>

      <MainContent tabIndex="-1">
        <MainTitle>Médicos Disponíveis</MainTitle>
        {filteredDoctors.length === 0 ? (
          <p>Nenhum médico encontrado com os filtros aplicados.</p>
        ) : (
          <DoctorList>
            {filteredDoctors.map(({ id, medico, especialidadeNome, disponibilidade }) => (
              <DoctorCard
                key={id}
                tabIndex="0"
                onClick={() => handleSelectDoctor(id)}
                aria-label={`Médico ${medico}, Especialidade: ${especialidadeNome}`}
              >
                <DoctorName>{medico}</DoctorName>
                <DoctorSpecialty>{especialidadeNome}</DoctorSpecialty>
                <DoctorAvailability>
                  <strong>Disponível em:</strong>{' '}
                  {new Date(disponibilidade[0].data).toLocaleDateString('pt-BR')}
                </DoctorAvailability>
              </DoctorCard>
            ))}
          </DoctorList>
        )}
      </MainContent>
    </SidebarContainer>
  );
}

export default DoctorsList;
