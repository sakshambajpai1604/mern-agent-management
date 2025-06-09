import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="register-page-container">
      <h2 className="register-title">Register</h2>
      <RegistrationForm onRegister={() => navigate('/dashboard')} />
    </div>
  );
};

export default Register;