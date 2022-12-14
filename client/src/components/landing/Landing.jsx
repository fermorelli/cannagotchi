import banner from '../../assets/banner.png';
import './landing.css';
import { Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';

export const Landing = () => {
    return (
        <>
        <div className="all-landing">
                <div className="banner">
                    <img id="banner" src={banner} alt="cannagotchi banner" />
                    <div className="p-banner">
                        <p>We aim to provide you with a complete set of tracking tools that will help you maintain a delicate control of your crops. We provide a full detailed information about each one of your plants, as well as a prediction system that will help you remember harvest dates, cycles, and much more!</p>
                        <br/>
                        <p>Wanna join in? Start by making a <Link to={'/signup'}><span id="link">new account</span></Link></p>
                    </div>
                </div>
                <div className="about">
                    <div className="about_header">
                        <h1>About Cannagotchi</h1>
                    </div>
                    <div className="about_body">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius neque reiciendis placeat inventore molestias similique minima aut ab eum quidem perspiciatis corporis porro quasi officiis, delectus vel perferendis non error.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius neque reiciendis placeat inventore molestias similique minima aut ab eum quidem perspiciatis corporis porro quasi officiis, delectus vel perferendis non error.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius neque reiciendis placeat inventore molestias similique minima aut ab eum quidem perspiciatis corporis porro quasi officiis, delectus vel perferendis non error.</p>
                    </div>
                </div>
        </div>
        <Footer/>
        </>
    )
}