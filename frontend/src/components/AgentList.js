import { useEffect, useState } from 'react';
import API from '../api/axios';
import './AgentList.css';

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await API.get('/agents');
      setAgents(data);
    };
    fetchAgents();
  }, []);

  return (
    <div className="agent-list-container">
      <h3 className="agent-list-title">Agents</h3>
      <ul className="agent-list">
        {agents.length === 0 ? (
          <li className="agent-list-empty">No agents found.</li>
        ) : (
          agents.map((a) => (
            <li className="agent-list-item" key={a._id}>
              <div className="agent-avatar">{a.name[0]?.toUpperCase()}</div>
              <div className="agent-info">
                <span className="agent-name">{a.name}</span>
                <span className="agent-email">{a.email}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AgentList;