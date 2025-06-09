import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  return <RegistrationForm onRegister={() => navigate('/dashboard')} />;
};

export default Register;