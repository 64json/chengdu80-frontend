import React, { useState } from 'react';
import './SignIn.scss';
import Logo from './Logo';
import { Link } from 'react-router-dom';

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [passowrd, setPassowrd] = useState('');

  return (
    <div className="SignIn">
      <Logo/>
      <input type="text" className="input" placeholder="Username" value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input type="password" className="input" placeholder="Password" value={passowrd}
             onChange={e => setPassowrd(e.target.value)}/>
      <Link className="button" onClick={onSignIn} to="/">Sign In</Link>
    </div>
  );
}

export default SignIn;
