import { useEffect, useState } from 'react';
import API from '../api/axios';

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
    <div>
      <h3>Agents</h3>
      <ul>
        {agents.map((a) => (
          <li key={a._id}>{a.name} - {a.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;