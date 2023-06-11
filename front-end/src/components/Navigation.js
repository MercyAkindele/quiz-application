import {Link} from 'react-router-dom';
import "../styles/navigation.css";
export default function Navigation(){
  return(
    <nav>
      <Link to="/" className="title">
        <h3>Let's Take A Quiz</h3>
      </Link>
      <ul className="menu">
        <li><Link to="/questions/new" className="link">Create Quiz</Link></li>
        <li><Link to="/quiz" className="link">Take Quiz</Link></li>
        <li><Link to="/scores" className="link">Scoreboard</Link></li>
        <li><Link to='/questions' className="link">Questions List</Link></li>
      </ul>
    </nav>
  )
}