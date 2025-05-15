import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/users';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', id: null });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await fetch(`${API_URL}/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      });
    }
    setForm({ name: '', email: '', id: null });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{form.id ? 'Update' : 'Add'} User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => handleEdit(u)}>Edit</button>
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
