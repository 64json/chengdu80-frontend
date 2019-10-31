import React from 'react';
import './Logo.scss';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link className="Logo" to="/">
      <span className="highlight">Pro</span>Scope
    </Link>
  );
}

export default Logo;
