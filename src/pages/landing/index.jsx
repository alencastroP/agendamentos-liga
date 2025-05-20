import React from 'react';
import Header from '../../components/header';
import styled from 'styled-components';
import Features from '../../components/features';
import Footer from '../../components/footer';
import { useNavigate } from 'react-router-dom';

const BodyIntroduction = styled.section`
    width: 70%;
    align-items: center;
    height: 300px;
    text-align: center;
    position: relative;
    background: linear-gradient(135deg, #FF6E4D, #FF3A6B);
    border-radius: 7px;
    border: none;
    justify-content: center;
    margin: 40px auto;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const BodyTitle = styled.h2`
    color: #fff;
    font-optical-sizing: auto;
    font-weight: bold;
    font-size: 2.2rem;
    font-style: normal;
    padding-top: 9%;
    text-align: center;
`;

const BodyText = styled.p`
    color: #fff;
`;

const FeatureTitle = styled.h2`
    color: #000;
    font-optical-sizing: auto;
    font-weight: bold;
    font-size: 2.2rem;
    font-style: normal;
    padding-top: 4%;
    margin-bottom: 1%;
    text-align: center;
`;

const FeatureSection = styled.section`
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    justify-content: center;
    display: flex;
    align-items: center;
    text-align: center;
`;

function Landing() {
    const navigate = useNavigate();  

    const handleNavigate = (page) => {
    navigate(`/${page}`);
  };

    return (
        <>
            <Header />
            <PageWrapper>
                <FeatureTitle>Por quê agendar sua consulta online?</FeatureTitle>
                <FeatureSection>
                    <Features title="Agendamento fácil" description="Marque consultas em poucos cliques." img="https://www.svgrepo.com/show/533389/calendar-days.svg"></Features>
                    <Features title="Segurança" description="Seus dados e informações protegidos com tecnologia avançada." img="https://www.svgrepo.com/show/532328/shield-alt-1.svg"></Features>
                    <Features title="Flexibidade" description="Escolha horários que se ajustem à sua rotina." img="https://www.svgrepo.com/show/532105/clock-lines.svg"></Features>
                </FeatureSection>
                <BodyIntroduction onClick={() => handleNavigate('agendamentos')}>
                    <BodyTitle>Agende aqui suas consultas médicas com facilidade</BodyTitle>
                    <BodyText>A plataforma ideal para organizar seus atendimentos com agilidade e segurança</BodyText>
                </BodyIntroduction>
            </PageWrapper>
            <Footer/>
        </>
    );
}

export default Landing;
