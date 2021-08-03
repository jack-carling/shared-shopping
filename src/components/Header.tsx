import React, { useState, useEffect, useRef } from 'react';

import './Header.scss';

interface Props {
  handleSettings: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  name: string;
}

function Header({ handleSettings, handleShare, name }: Props) {
  const [displayName, setDisplayName] = useState('');
  const header = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    setDisplayName(name);
    localStorage.name = name;
  }, [name]);
  return (
    <section className="Header">
      <h1 className="Header" ref={header}>
        {displayName}
      </h1>
      <div>
        <i className="material-icons" onClick={handleShare}>
          share
        </i>
        <i className="material-icons" onClick={handleSettings}>
          settings
        </i>
      </div>
    </section>
  );
}

export default Header;
