import { useEffect, useState } from "react";
import api from "../services/api";
import AddAgentForm from "../components/AddAgentForm";
import UploadList from "../components/UploadList";
import AgentLists from "../components/AgentLists";

export default function Dashboard() {
  const [agents, setAgents] = useState([]);

  const fetchAgents = () => {
    api.get("/agents").then(res => setAgents(res.data));
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div>
      <h2>Agents</h2>
      <AddAgentForm onAgentAdded={fetchAgents} />
      <UploadList />
      <AgentLists />
    </div>
  );
}