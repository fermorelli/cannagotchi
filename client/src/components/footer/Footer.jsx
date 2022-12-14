import './footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_links">
                <Link to={'/'}><span>HOME</span></Link>
                <Link to={'/faqs'}><span>FAQs</span></Link>
            </div>
            <div className="socials">
                <span>a</span>
                <span>b</span>
                <span>c</span>
            </div>
        </footer>
    )
}