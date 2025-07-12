import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import './Users.css'; // ⬅️ New CSS file for styling
import {  FaUsers } from 'react-icons/fa6';

export default function Users() {
  const [users, setUsers] = useState([]);

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
    <div className="users-page">
      <h1 className="users-heading"><FaUsers /> &nbsp; Users</h1>
      <div className="users-table-wrapper">
        <UserTable users={users} />
      </div>
    </div>
  );
}
