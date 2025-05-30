import { useEffect, useState } from "react";
import api from "../services/api";

export default function AgentLists() {
  const [agents, setAgents] = useState([]);
  const [lists, setLists] = useState({});

  useEffect(() => {
    async function fetchData() {
      const resAgents = await api.get("/agents");
      setAgents(resAgents.data);

      // For each agent, fetch their list items
      const listsData = {};
      await Promise.all(
        resAgents.data.map(async (agent) => {
          const res = await api.get(`/lists/${agent._id}`);
          listsData[agent._id] = res.data;
        })
      );
      setLists(listsData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {agents.map((agent) => (
        <div key={agent._id}>
          <h3>{agent.name}</h3>
          <ul>
            {(lists[agent._id] || []).map((item) => (
              <li key={item._id}>
                {item.firstName} - {item.phone} - {item.notes}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}