import React, { useRef, useEffect } from 'react';
import { TweenMax, Power0 } from 'gsap';

const Footer = () => {
    let footer = useRef(null);
    useEffect(() => {
        TweenMax.fromTo(footer, 1.5, { x: 1500 }, { x: 0, ease: Power0, delay: 1 });
    }, [])
    return (
        <footer ref={element => { footer = element }} className="text-muted">
            <div className="container">
                <p> Copyright Artkodes & Jordan 2020 </p>
            </div>
        </footer>
    );
};

export default Footer;