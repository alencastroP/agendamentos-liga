import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  max-width: 1800px;
  margin: 24px auto;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  padding: 24px;
  font-family: 'Inter', sans-serif;
  background: white;
`;
const Main = styled.main`
  margin-top: 24px;
  display: flex;
  flex-direction: column
  @media(min-width: 768px) {
    flex-direction: row;
    gap: 24px;
  }
`;
const LeftSection = styled.section`
  flex-shrink: 0;
  width: 100%
  @media(min-width: 768px) {
    width: 60%;
  }
`;
const RightSection = styled.section`
  margin-top: 24px;
  width: 100%
  @media(min-width: 768px) {
    margin-top: 0;
    width: 40%;
  }
`;
const ProfileHeader = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileName = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 1.2;
  color: #111827;
  margin: 0;
`;
const ProfileSubtitle = styled.p`
  font-size: 14px;
  color:rgb(99, 75, 75);
  margin: 2px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  font-weight: 400;
`;
const ProfileSubtitleStrong = styled.span`
  font-weight: 600;
  padding: 3px 0 3px 0;
`;
const TeleconsultaButton = styled.button`
  margin-top: 8px;
  background-color: #FF3A6B;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: none;
  cursor: pointer;
  user-select: none;
`;
const PhoneButton = styled.button`
  margin-top: 4px;
  font-size: 14px;
  color:rgb(41, 41, 41);
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 4px 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: white;
  cursor: pointer;
  user-select: none;
`;
const SectionBlock = styled.div`
  margin-top: 24px;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
`;
const SectionTitle = styled.h2`
  font-weight: 600;
  font-size: 24px;
  color:rgb(39, 17, 17);
  margin-bottom: 14px;
`;
const FormationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 1.2rem;
  color: #4b5563;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const FormationItemTitle = styled.p`
  font-weight: 600;
  color: #111827;
  margin: 5px 0 3px 0;
`;
const FormationItemSub = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;
const ConveniosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const ConvenioTag = styled.span`
  background-color:#FF3A6B;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 50px;
  border-radius: 9999px;
  padding: 10px 18px;
  user-select: none;
  white-space: nowrap;
`;
const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  font-size: 10px;
  color: #111827;
`;
const WeekDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #4b5563;
  user-select: none;
  text-align: center;
`;
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-top: 4px;
  font-size: 12px;
  text-align: center;
`;
const DayButton = styled.button`
  border-radius: 4px;
  padding: 10px 0;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  border: none;
  transition: background-color 0.2s ease, color 0.2s ease
  background-color: ${(props) =>
    props.isSelected
      ? "rgb(245, 40, 88)"
      : props.isAvailable
      ? "rgb(247, 193, 206)"
      : "rgb(161, 156, 157)"};
  color: ${(props) =>
    props.isSelected
      ? "rgb(255, 255, 255)"
      : props.isAvailable
      ? "rgb(252, 51, 101)"
      : "white"};
  border: ${(props) => (props.isSelected ? "2px solidrgb(189, 42, 42)" : "none")};
  opacity: ${(props) => (props.isAvailable ? "1" : "0.6")};
  pointer-events: ${(props) => (props.isAvailable ? "auto" : "none")}
  &:hover {
    background-color: ${(props) =>
      props.isAvailable && !props.isSelected ? "#9ca3af" : ""};
    color: ${(props) =>
      props.isAvailable && !props.isSelected ? "white" : ""};
  }
`;
const MonthNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  color:rgb(31, 9, 9);
  user-select: none;
`;
const MonthNavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color:rgb(99, 75, 75);
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px
  &:hover {
    color:rgb(39, 17, 17);
    background-color: #e5e7eb;
  }
`;
const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
  font-size: 12px;
  color:rgb(99, 75, 75);
  text-align: center;
`;
const TimeSlotButton = styled.button`
  background-color:rgb(189, 42, 74);
  color: white;
  border-radius: 4px;
  padding: 6px 0;
  margin-top: 5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  user-select: none
  &:hover {
    background-color:rgb(138, 30, 30);
  }
`;
const SelectedDayLabel = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #111827;
  margin: 8px 0 8px 0;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  text-align: center;
`;
const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1.2rem;
`;
const ModalButtonsSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
`;

const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`

const ModalButtons =styled.button`
  background: linear-gradient(135deg, #FF6E4D, #FF3A6B);   ;
  padding: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg,rgb(215, 43, 72) 0%,rgb(215, 43, 86) 100%);
  }
`

const CardTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
`;
const SectionText = styled.p`
  font-size: 16px;
  color: rgb(99, 75, 75);
  padding-bottom: 5px;
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  margin-bottom: ${(props) => (props.mb ? `${props.mb}px` : '0')};
`;

const LocationContainer = styled.div`
  margin-top: 16px;
`;
const AddressText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  margin-bottom: 14px;
`;

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  function formatDate(date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  function formatDateLabel(date) {
    const dayName = weekDays[date.getDay()];
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear().toString().slice(-2);
    return `${dayName} ${d}/${m}/${y}`;
  }
  function Appointment() {
    const [doctor, setDoctor] = useState(null);
    const [availability, setAvailability] = useState({});
    const { id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [expanded, setExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
      const fetchDoctorData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/medicos?id=${id}`);
          const fetchedDoctor = response.data[0];
          setDoctor(fetchedDoctor);
          const availabilityData = {};
          fetchedDoctor.disponibilidade.forEach(item => {
            availabilityData[item.data] = item.horarios.filter(h => h.disponivel);
          });
          setAvailability(availabilityData);
        } catch (error) {
          console.error("Erro ao buscar dados do doutor:", error);
        }
      };
      fetchDoctorData();
    }, [id]);

          const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay();
      const cellsToRender = expanded ? 42 : 28;
      const calendarDays = [];

      for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
      }
      for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(new Date(year, month, day));
      }
      while (calendarDays.length < cellsToRender) {
        calendarDays.push(null);
      }
      function handlePrevMonth() {
        setCurrentDate(new Date(year, month - 1, 1));
      }
      function handleNextMonth() {
        setCurrentDate(new Date(year, month + 1, 1));
      }
      function handleDayClick(day) {
        if (!day) return;
        const dayStr = formatDate(day);
        if (!availability[dayStr]) return;
        setSelectedDate(day);
      }
          const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setIsModalOpen(true);
      };
      const handleConfirmAppointment = async () => {
        const selectedDateStr = formatDate(selectedDate);
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        try {
          await axios.post('http://localhost:3000/atendimentos', {
            pacienteId: user.id,
            paciente: user.nome,
            pacienteConvenio: user.convenio,
            dataAtendimento: selectedDateStr,
            time: selectedSlot.horaInicio,
            doctorId: doctor.id,
            especialidadeId: doctor.especialidadeId,
            especialidadeNome: doctor.especialidadeNome
          });
          alert('Consulta agendada com sucesso!');
          setIsModalOpen(false);
        } catch (error) {
          console.error("Erro ao agendar consulta:", error);
          alert('Erro ao agendar consulta. Tente novamente.');
        }
      };

      const selectedDateStr = formatDate(selectedDate);
      const slots = availability[selectedDateStr] || [];

  return (
    <>
      <Container>
        <Main>
          <LeftSection>
            <ProfileHeader>
              <ProfileImage src={doctor?.image || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"} />
              <ProfileInfo>
                <ProfileName>{doctor?.medico || "Nome do Doutor"}</ProfileName>
                <ProfileSubtitle>
                  {doctor?.especialidadeNome || "Especialidade"}
                  <ProfileSubtitleStrong> CRM {doctor?.crm || "CRM"}</ProfileSubtitleStrong>
                </ProfileSubtitle>
                <TeleconsultaButton type="button">
                  <i style={{ fontSize: "10px" }}></i>
                  <span>{doctor?.teleconsulta ? "Atende teleconsulta" : "Não atende teleconsulta"}</span>
                </TeleconsultaButton>
                <PhoneButton type="button">
                  <span>{doctor?.telefone || "Ver telefone"}</span>
                  <i style={{ fontSize: "12px" }}></i>
                </PhoneButton>
              </ProfileInfo>
            </ProfileHeader>

            <SectionBlock>
              <SectionTitle>Apresentação</SectionTitle>
              <SectionText>{doctor?.apresentacao || "Seja bem Vindo"}</SectionText>
            </SectionBlock>
            <SectionBlock>
              <SectionTitle>Formação</SectionTitle>
              <FormationList>
                {doctor?.formacao.map((item, index) => (
                  <li key={index}>
                    <FormationItemTitle>{item.titulo}</FormationItemTitle>
                    <FormationItemSub>{item.instituicao} - {item.ano}</FormationItemSub>
                  </li>
                ))}
              </FormationList>
            </SectionBlock>
            <SectionBlock>
              <SectionTitle>Convênios atendidos</SectionTitle>
              <ConveniosContainer>
                {doctor?.convenios.map((convenio, index) => (
                  <ConvenioTag key={index}>{convenio}</ConvenioTag>
                ))}
              </ConveniosContainer>
            </SectionBlock>
          </LeftSection>

          <RightSection>
            <Card>
              <CardTitle>Agendar consulta</CardTitle>

              <MonthNav>
                <MonthNavButton onClick={handlePrevMonth} aria-label="Previous month">
                  <i></i>
                </MonthNavButton>
                <div>{monthNames[month]} {year}</div>
                <MonthNavButton onClick={handleNextMonth} aria-label="Next month">
                  <i></i>
                </MonthNavButton>
              </MonthNav>

              <WeekDaysGrid>
                {weekDays.map((wd) => (
                  <div key={wd}>{wd}</div>
                ))}
              </WeekDaysGrid>

              <CalendarGrid>
                {calendarDays.map((day, i) => {
                  if (!day) return <div key={"empty-" + i} />;
                  const dayStr = formatDate(day);
                  const isAvailable = !!availability[dayStr];
                  const isSelected = dayStr === formatDate(selectedDate);
                  return (
                    <DayButton
                      key={dayStr}
                      isAvailable={isAvailable}
                      isSelected={isSelected}
                      onClick={() => handleDayClick(day)}
                      aria-label={`Dia ${day.getDate()} ${isAvailable ? "disponível" : "indisponível"}`}
                    >
                      {day.getDate()}
                    </DayButton>
                  );
                })}
              </CalendarGrid>

              <SelectedDayLabel>{formatDateLabel(selectedDate)}</SelectedDayLabel>
              <TimeSlotsGrid>
                {slots.length === 0 ? (
                  <p style={{ gridColumn: "span 4", color: "#6b7280", fontSize: "10px" }}>
                    Nenhum horário disponível para este dia.
                  </p>
                ) : (
                  <>
                    {slots.map((slot) => (
                      <TimeSlotButton key={slot.agendamentoId} type="button" onClick={() => handleSlotClick(slot)}>
                        {slot.horaInicio} - {slot.horaFim}
                      </TimeSlotButton>
                    ))}
                  </>
                )}
              </TimeSlotsGrid>
              <ModalOverlay isOpen={isModalOpen}>
                <Modal>
                  <ModalTitle>Confirmar Agendamento</ModalTitle>
                  <ModalText>Você deseja agendar uma consulta para {formatDateLabel(selectedDate)}?</ModalText>
                  <ModalButtonsSection>
                    <ModalButtons onClick={handleConfirmAppointment}>Confirmar</ModalButtons>
                    <ModalButtons onClick={() => setIsModalOpen(false)}>Cancelar</ModalButtons>
                  </ModalButtonsSection>
                </Modal>
              </ModalOverlay>
            </Card>

            <Card>
              <LocationContainer></LocationContainer>
              <CardTitle>Locais de atendimento</CardTitle>
              <SectionText>
                Hospital Dr. Luiz Antônio
              </SectionText>
              <AddressText>
                Rua Dr. Mário Negócio, 2267, Quintas, Natal/RN, CEP 59040-000
              </AddressText>
              <SectionText>
                CECAN - Centro Avançado de Oncologia
              </SectionText>
              <AddressText>
                Avenida Miguel Castro, 1355, Nossa Sra. de Nazaré, Natal/RN, CEP 59062-000
              </AddressText>
              <SectionText>
                Instituto de Ensino, Pesquisa e Inovação
              </SectionText>
              <AddressText>
                Avenida Miguel Castro, 1355, Nossa Sra. de Nazaré, Natal/RN, CEP 59062-200
              </AddressText>
            </Card>
          </RightSection>
        </Main>
      </Container>
    </>
  );
}

export default Appointment;
