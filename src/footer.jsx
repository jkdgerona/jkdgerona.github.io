import './footer.css'
import facebook from './assets/Portfolio/facebook.png'
import github from './assets/Portfolio/github.png'
import instagram from './assets/Portfolio/instagram.png'
import linkedin from './assets/Portfolio/linkedin.png'
import mail from './assets/Portfolio/mail.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; 2026 Kenneth Gerona. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <img src={facebook} alt="Facebook" />
          <img src={github} alt="GitHub" />
          <img src={instagram} alt="Instagram" />
          <img src={linkedin} alt="LinkedIn" />
          <img src={mail} alt="mail" />
        </div>
      </div>
    </footer>
  )
}

export default Footer