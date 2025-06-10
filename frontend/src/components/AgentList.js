import { useEffect, useState } from 'react';
import API from '../api/axios';
import './AgentList.css';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '', mobile: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAgents = async () => {
    const { data } = await API.get('/agents', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setAgents(data);
  };

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line
  }, []);

  // CREATE
  const handleAddChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAddAgent = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await API.post('/agents', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setForm({ name: '', email: '', password: '', mobile: '' });
      setMsg('Agent added!');
      fetchAgents();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to add agent');
    }
    setLoading(false);
  };

  // UPDATE
  const startEdit = (agent) => {
    setEditingId(agent._id);
    setEditForm({ name: agent.name, email: agent.email, password: '', mobile: agent.mobile || '' });
    setMsg('');
  };
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await API.put(`/agents/${editingId}`, editForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEditingId(null);
      setEditForm({ name: '', email: '', password: '', mobile: '' });
      setMsg('Agent updated!');
      fetchAgents();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to update agent');
    }
    setLoading(false);
  };

  // DELETE
  const handleDeleteAgent = async (id) => {
    if (!window.confirm('Delete this agent?')) return;
    setLoading(true);
    setMsg('');
    try {
      await API.delete(`/agents/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMsg('Agent deleted!');
      fetchAgents();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to delete agent');
    }
    setLoading(false);
  };

  return (
    <div className="agent-list-container">
      <h3 className="agent-list-title">Agents</h3>

      {/* Add Agent Form */}
      <form className="agent-add-form" onSubmit={handleAddAgent}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleAddChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleAddChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleAddChange}
          required
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleAddChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Add Agent'}
        </button>
      </form>

      {msg && <div className="agent-list-msg">{msg}</div>}

      <ul className="agent-list">
        {agents.length === 0 ? (
          <li className="agent-list-empty">No agents found.</li>
        ) : (
          agents.map((a) => (
            <li className="agent-list-item" key={a._id}>
              <div className="agent-avatar">{a.name[0]?.toUpperCase()}</div>
              <div className="agent-info">
                {editingId === a._id ? (
                  <form className="agent-edit-form" onSubmit={handleEditAgent}>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      name="password"
                      type="password"
                      placeholder="New Password"
                      value={editForm.password}
                      onChange={handleEditChange}
                    />
                    <input
                      name="mobile"
                      placeholder="Mobile"
                      value={editForm.mobile}
                      onChange={handleEditChange}
                      required
                    />
                    <button type="submit" disabled={loading}>Save</button>
                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <span className="agent-name">{a.name}</span>
                    <span className="agent-email">{a.email}</span>
                    <span className="agent-mobile">{a.mobile}</span>
                  </>
                )}
              </div>
              {editingId !== a._id && (
                <div className="agent-actions">
                  <button onClick={() => startEdit(a)}>Edit</button>
                  <button onClick={() => handleDeleteAgent(a._id)}>Delete</button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AgentList;