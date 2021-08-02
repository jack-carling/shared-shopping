import React, { useState, useEffect, useRef } from 'react';

import './Header.scss';

interface Props {
  handleSettings: (e: React.MouseEvent) => void;
  name: string;
}

function Header({ handleSettings, name }: Props) {
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
      <i className="material-icons" onClick={handleSettings}>
        settings
      </i>
    </section>
  );
}

export default Header;
