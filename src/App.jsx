import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/index.jsx';
import AppointmentList from './pages/appointmentsList/index.jsx';
import Agendamento from './pages/appointment/index.jsx'
import Login from './pages/login/index.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Landing/>} />
        <Route path="/agendamentos" element={<AppointmentList/>} />
        <Route path="/agendamento/:id" element={<Agendamento />} />
      </Routes>
    </Router>
  );
}

export default App;