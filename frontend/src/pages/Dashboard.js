import FileUpload from '../components/FileUpload';
import AgentList from '../components/AgentList';
import './Dashboard.css';

const Dashboard = () => (
  <div className="dashboard-container">
    <h2 className="dashboard-title">Admin Dashboard</h2>
    <div className="dashboard-content">
      <FileUpload />
      <AgentList />
    </div>
  </div>
);

export default Dashboard;