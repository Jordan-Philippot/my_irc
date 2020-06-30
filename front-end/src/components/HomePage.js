import React, { useEffect, useState, useRef } from 'react';
import { TimelineMax } from 'gsap';
// import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

// const ENDPOINT = 'http://localhost:5000/';
// let socket;
function HomePage() {
    // eslint-disable-next-line
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    let [allUsers, setAllUsers] = useState([]);
    const history = useHistory();

    const join = (e) => {
        setName(name.toLowerCase().trim());
        history.push(`tchat/${name}/0`)
    }


    let connect = useRef();

    //Animations for TL
    useEffect(() => {
        let tl = new TimelineMax()
        tl.fromTo(connect, 0.5, { scale: 0 }, { scale: 1, delay: 3 })
        tl.fromTo(connect, 0.2, { boxShadow: "0 0 30px 2px #FFF" }, { boxShadow: "0 0 0px 0px #FFF", repeat: 2 });
        return () => {
            tl.fromTo(connect, 0.5, { scale: 1 }, { scale: 0, delay: 1 })
            tl.fromTo(connect, 0.2, { boxShadow: "0 0 0px 0px #FFF" }, { boxShadow: "0 0 30px 2px #FFF", repeat: 2 });
        }
    }, []);



    return (

        <div className="connectContainer container">
            <div className="row justify-content-center">
                <div ref={element => { connect = element }} className="col-xs-12 col-sm-10 col-md-8 col-lg-5 connect">
                    <h1>CONNECT</h1>
                    <div className="bodyConnect">
                        <label htmlFor="name">USERNAME</label>
                        <input type="text" name="name" onChange={e => setName(e.target.value)} placeholder="zachychan" /><br></br>
                        <p className="termConnect">* by connecting to Jo & Zk you accept our terms and conditions</p><br></br>
                        <div className="row justify-content-end">
                            <button className="btn btn-dark" onClick={join}>CONNECT</button>
                        </div>
                    </div>
                    {allUsers.map((user) => (
                        <li key={user.id}> {user.name} <br />

                        </li>
                    ))}
                    {message && (
                        <div className="message">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default HomePage
