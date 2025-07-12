import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import UserTable from '../components/UserTable';
import Form from '../components/Form';
import './Dashboard.css';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://68708e6c7ca4d06b34b7282b.mockapi.io/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard Overview</h1>

      <section className="dashboard-section">
        <h2 className="section-title">Activity Chart</h2>

          <Chart />

      </section>

      <section className="dashboard-section">
        <h2 className="section-title">User Activity</h2>
        <UserTable users={users} />
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Submit New User</h2>
        <Form onSuccess={fetchUsers} />
      </section>
    </div>
  );
}
