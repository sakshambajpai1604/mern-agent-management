import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-page-container">
      <h2 className="login-title">Admin Login</h2>
      <LoginForm onLogin={() => navigate('/dashboard')} />
    </div>
  );
};

export default Login;