import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
      <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>
            <ul  id="nav-mobile" class="right hide-on-med-and-down">
                <li><Link to={'/shop'}>Shop</Link></li>
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        
    </div>
    </nav>
  )
}
