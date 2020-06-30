import React, { useRef, useEffect } from 'react';
import {
    Link
} from 'react-router-dom';
import { TweenMax, Power0 } from 'gsap';

const Header = () => {
    let navbar = useRef(null);
    useEffect(() => {
        TweenMax.fromTo(navbar, 1.5, { x: -1500 }, { x: 0, ease: Power0 });
    }, [])
    return (
        <header>
            <div className="background"></div>
            <nav ref={element => { navbar = element }}
                className="navbar navbar-expand-sm navbar-dark">
                <li className="navbar-brand">ZK & JO</li>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">GITHUB.</Link><span className="sr-only">(current)</span>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">ABOUT.</Link><span className="sr-only">(current)</span>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">LOGOUT.</Link><span className="sr-only">(current)</span>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;