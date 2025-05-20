import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #FF6E4D, #FF3A6B);   
  padding-left: 25%;
  padding-right: 0;
  max-width: 50px;
  @media (max-width: 768px) {
    align-items: center;
    padding: 0 1.5rem;
  }
`;

const LoginForm = styled.form`
  background: white;
  padding: 4rem;
  left: 20rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 380px;
  position: absolute;
`;

const Title = styled.h2`
  color:rgb(215, 43, 95);
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
`;

const Input = styled.input`
  width: 92.9%;
  padding: 0.8rem;
  margin: 0 0 1.5rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.9rem;
  color:rgb(211, 198, 202);
  background-color:rgb(246, 243, 244);
  outline-offset: 2px;

  &:focus {
    outline: none;
    border-color:rgb(215, 43, 52);
    box-shadow: 0 0 0 1px rgb(215, 43, 115);
    background-color: white;
    color: #111827;
  }
`;

const Button = styled.button`
  position: relative;
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.7rem;
  background: linear-gradient(135deg, #FF6E4D, #FF3A6B);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg,rgb(215, 43, 72) 0%,rgb(215, 43, 86) 100%);
  }
`;

const ToggleButton = styled.button`
  position: relative;
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.7rem;
  background-color: white;
  color:rgb(215, 43, 72);
  border: 1px solid rgb(215, 43, 80);
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color:rgb(215, 43, 66);
    color: white;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
`;

function Login() {
  const [paciente, setPaciente] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    localStorage.setItem('email', email);
    localStorage.setItem('senha', password);

    try {
      const response = await fetch('http://localhost:3000/pacientes');
      const data = await response.json();
      const user = data.find((user) => user.email === email && user.senha === password);

      if (user) {
        console.log('Login bem-sucedido:', user);
        localStorage.setItem('loggedUser', JSON.stringify(user));
        navigate('/');
      } else {
        setError('E-mail ou senha incorretos.');
      }
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
      setError('Erro ao conectar com a API.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!paciente || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/pacientes');
      const data = await response.json();
      const existingUser  = data.find((user) => user.email === email);

      if (existingUser ) {
        setError('E-mail já está em uso.');
        return;
      }

      const newUser  = {
        paciente,
        email,
        senha: password, 
        convenioId,
      };

      const postResponse = await fetch('http://localhost:3000/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser ),
      });

      if (postResponse.ok) {
        const createdUser  = await postResponse.json();
        console.log('Usuário registrado:', createdUser );
        localStorage.setItem('loggedUser ', JSON.stringify(createdUser ));
        navigate('/');
      } else {
        setError('Erro ao registrar usuário.');
      }
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
      setError('Erro ao conectar com a API.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={isRegistering ? handleRegister : handleLogin} noValidate>
        <Title>{isRegistering ? 'Registrar' : 'Login'}</Title>
        {isRegistering && (
          <Input
            type="text"
            placeholder="Nome"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            autoComplete="name"
            required
          />
        )}
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegistering ? "new-password" : "current-password"}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">{isRegistering ? 'Registrar' : 'Entrar'}</Button>
        <ToggleButton type="button" onClick={() => { setError(''); setIsRegistering(!isRegistering); }}>
          {isRegistering ? 'Já tenho uma conta' : 'Registrar'}
        </ToggleButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
