import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from '../user/Modal/index.jsx'
import UserAppointmentModal from '../user/appointments/index.jsx'

const HeaderContainer = styled.header`  
  background: linear-gradient(135deg, #FF6E4D, #FF3A6B);   
  width: 100%;   
  max-width: auto;   
  box-sizing: border-box;   
  height: 53px;   
  position: sticky;   
  top: 0;   
  z-index: 1000;   
  padding: 0 2rem;    
  margin: 0 auto;   
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);   
  display: flex;   
  align-items: center;   
  justify-content: space-between;`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LigaIco = styled.img`
  width: 80px;
  padding: 30px;
  cursor: pointer;
  margin: 0 8% 0 15%;
`;

const ButtonContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 45px;
`;

const HeaderButton = styled.button`
  background: linear-gradient(135deg,#ff3a6b, #FF6E4D);
  border-radius: 5px;
  color: #fff;
  border: none;
  padding: 8px 15px;
  font-size: 18px;


  &:hover {
    cursor: pointer;
    background: linear-gradient(135deg,rgb(250, 96, 135),rgb(250, 171, 153));
  }
`;

const DropdownContainer = styled.div`
  margin-left: auto;
`;

const DropdownToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 1px;
  }
`;

const UserIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 48px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.15);
  display: ${(props) => (props.show ? 'block' : 'none')};
  min-width: 160px;
  z-index: 1100;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover, &:focus {
    background-color: #f0f0f0;
  }
`;


function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null);
  const dropdownRef = useRef(null);
  

  const handleNavigate = (page) => {
    setDropdownOpen(false);
    navigate(`/${page}`);
  };

    const handleLogout = () => {
    localStorage.removeItem('loggedUser'); 
    navigate('/login');
  };

  const openMyDataModal = () => {
    setSidebarContent('meus-dados');
    setSidebarVisible(true);
  };

  const openMyAppointmentsModal = () => {
    setSidebarContent('meus-agendamentos');
    setSidebarVisible(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <LigaIco
            src="https://ligacontraocancer.com.br/wp-content/themes/v01/assets/img/build/logo-liga-contra-o-cancer-negativo.3c2a15af.png"            
            alt="Liga Contra o Câncer"
            onClick={() => handleNavigate('')}
          />
        </LogoContainer>
        <ButtonContainer>
          <HeaderButton onClick={() => handleNavigate('')}>Início</HeaderButton>
          <HeaderButton onClick={() => handleNavigate('agendamentos')}>Agendamentos</HeaderButton>
          <DropdownContainer ref={dropdownRef}>
            <DropdownToggle
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-label="Menu do usuário"
            >
              <UserIcon src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Usuário" />
            </DropdownToggle>
            <DropdownMenu show={dropdownOpen} role="menu" aria-label="Opções do usuário">
              <DropdownItem onClick={openMyDataModal} role="menuitem">
                Meus Dados
              </DropdownItem>
              <DropdownItem onClick={openMyAppointmentsModal} role="menuitem">
                Meus Agendamentos
              </DropdownItem>
              <DropdownItem onClick={handleLogout} role="menuitem">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
        </ButtonContainer>
      </HeaderContainer>

    {sidebarVisible && sidebarContent && (
      sidebarContent === 'meus-dados' ? (
        <Modal userData={sidebarContent} onClose={() => setSidebarVisible(false)} />
      ) : (
        <UserAppointmentModal userData={sidebarContent} onClose={() => setSidebarVisible(false)} />
      )
    )}
    </>
  );
}

export default Header;
