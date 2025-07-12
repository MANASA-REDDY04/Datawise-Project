import { useState } from 'react';
import axios from 'axios';
import './Form.css';

interface FormProps {
  onSuccess: () => void;
}

export default function Form({ onSuccess }: FormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.includes('@')) newErrors.email = 'Invalid email';
    if (!avatarUrl && !file) newErrors.avatar = 'Provide an avatar URL or upload a file';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.get('https://68708e6c7ca4d06b34b7282b.mockapi.io/users');
      const exists = res.data.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setMessage('User with this email already exists.');
        return;
      }

      const avatar = file ? URL.createObjectURL(file) : avatarUrl;

      await axios.post('https://68708e6c7ca4d06b34b7282b.mockapi.io/users', {
        name,
        email,
        avatar,
        createdAt: new Date().toISOString(),
      });

      setMessage('Submitted successfully!');
      setName('');
      setEmail('');
      setAvatarUrl('');
      setFile(null);
      setErrors({});
      onSuccess();
    } catch {
      setMessage('Submission failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          className="form-input"
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Avatar URL (optional)"
        />
        <p className="or-text">OR</p>
        <input
          className="file-input"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {errors.avatar && <span className="error-text">{errors.avatar}</span>}
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>

      {message && <p className="status-text">{message}</p>}
    </form>
  );
}
