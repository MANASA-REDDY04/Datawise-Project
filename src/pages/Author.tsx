import './Author.css';
import {
  FaLinkedin,
  FaGithub,
  FaLocationDot,
  FaUserTie,
} from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import AuthorImage from '../assets/me.jpg';

export default function Author() {
  return (
    <div className="author-page">
      <div className="author-card">
        <img
          src={AuthorImage} // Replace with actual photo if needed
          alt="Kandadi Manasa Reddy"
          className="author-avatar"
        />
        <h2 className="author-name">Kandadi Manasa Reddy</h2>
        <p className="author-location">
          <FaLocationDot /> Hyderabad, India
        </p>

        <div className="author-links">
          <a href="https://www.linkedin.com/in/kandadi-manasa/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/MANASA-REDDY04" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://leetcode.com/u/manasa_1223/" target="_blank" rel="noopener noreferrer">
            <SiLeetcode />
          </a>
        </div>
      </div>

      <div className="author-projects">
        <h3><FaUserTie /> Freelance Projects</h3>
        <ul>
          <li>
            <a href="https://aadyafilms.com" target="_blank" rel="noopener noreferrer">
              Aadyafilms
            </a>
            <span className="code-link">
              <a href="https://github.com/MANASA-REDDY04/afilms-modified" target="_blank" rel="noopener noreferrer">[GitHub]</a>
            </span>
          </li>
          <li>
            <a href="https://samaladairyfarms.netlify.app/" target="_blank" rel="noopener noreferrer">
              Samala Dairy Farms
            </a>
            <span className="code-link">
              <a href="https://github.com/MANASA-REDDY04/samala-dairy-farms" target="_blank" rel="noopener noreferrer">[GitHub]</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
