import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import './Settings.css';

import { FaGear, FaUser, FaFloppyDisk, FaTrash, FaSun, FaMoon, FaBell, FaBellSlash, FaSliders } from 'react-icons/fa6';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
}

const defaultAvatar = "https://i0.wp.com/e-quester.com/wp-content/uploads/2021/11/placeholder-image-person-jpg-1.jpg?fit=820%2C678&ssl=1";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const apiUrl = 'https://68708e6c7ca4d06b34b7282b.mockapi.io/users';

  const fetchLatestUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get<User[]>(apiUrl);
      const latestUser = res.data.at(-1);
      setUser(latestUser || null);
    } catch {
      setMessage('Failed to load user.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestUser();
  }, []);

  const handleUpdate = async () => {
    if (!user) return;
    try {
      await axios.put(`${apiUrl}/${user.id}`, user);
      setMessage('Profile updated!');
      fetchLatestUser();
    } catch {
      setMessage('Failed to update.');
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete your account?')) return;
    try {
      await axios.delete(`${apiUrl}/${user.id}`);
      setUser(null);
      setMessage('Account deleted!');
    } catch {
      setMessage('Failed to delete.');
    }
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultAvatar;
  };

  if (loading) return <p className="settings-loading">Loading settings...</p>;

  if (!user) {
    return (
      <div className="settings-page">
        <h1><FaGear /> Settings</h1>
        <p>Please add a profile from the Dashboard form.</p>
        <a href="/" className="add-profile-btn">Add New Profile</a>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <h1><FaGear /> Settings</h1>

      <div className="profile-section">
        <h2><FaUser /> Profile</h2>
        <img
          src={user.avatar || defaultAvatar}
          alt="avatar"
          onError={handleImgError}
          className="avatar"
        />
        <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder="Name" />
        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
        <input value={user.avatar} onChange={(e) => setUser({ ...user, avatar: e.target.value })} placeholder="Avatar URL" />
        <div className="btn-group">
          <button onClick={handleUpdate}><FaFloppyDisk /> Save Changes</button>
          <button onClick={handleDelete} className="danger"><FaTrash /> Delete Account</button>
        </div>
        {message && <p className="status">{message}</p>}
      </div>

      <div className="theme-section">
  <h2><FaSliders /> Preferences</h2>

  <div className="icon-toggle-group">
  <div className="icon-group">
    <span className="icon-label">Toggle Theme</span>
    <span className="icon-click" onClick={toggleTheme} title="Toggle Theme">
      {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </span>
  </div>

  <div className="icon-group">
    <span className="icon-label">Notifications</span>
    <span
      className="icon-click"
      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
      title="Toggle Notifications"
    >
      {notificationsEnabled ? <FaBell /> : <FaBellSlash />}
    </span>
  </div>
</div>

</div>

    </div>
  );
}
