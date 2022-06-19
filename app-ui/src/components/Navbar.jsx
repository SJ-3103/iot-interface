import { Link } from "react-router-dom";
import "../res/navbar.css";

export default function Navbar() {
  return (
    <header className="header">
      <nav>
        <Link to="/">
          <ul>
            <div id="dcrust-logo"></div>
          </ul>
        </Link>
        <Link to="/">
          <ul>
            <div id="nav-image"></div>
            <h3>Growth Monitoring of Plants using Raspberry Pi and IoT</h3>
          </ul>
        </Link>
      </nav>
    </header>
  );
}
