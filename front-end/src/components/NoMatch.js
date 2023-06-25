import { useLocation } from "react-router-dom";
import "../styles/noMatch.css"
function NoMatch() {
  const location = useLocation();
  return (
    <div className="noMatch-container">
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default NoMatch;
