import React, { useState, useEffect, useRef } from 'react';

import './Header.scss';

interface Props {
  handleSettings: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  handleSave: (e: React.MouseEvent) => void;
  handleShowSave: () => void;
  name: string;
  showSave: boolean;
}

function Header({ handleSettings, handleShare, handleSave, handleShowSave, name, showSave }: Props) {
  const [displayName, setDisplayName] = useState('');
  const header = useRef<HTMLHeadingElement>(null);

  const firstRender = useRef(true);
  useEffect(() => {
    setDisplayName(name);
    localStorage.name = name;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    handleShowSave();
  }, [name]);

  return (
    <section className="Header">
      <h1 className="Header" ref={header}>
        {displayName}
      </h1>
      <div>
        {showSave && (
          <i className="material-icons" onClick={handleSave}>
            save
          </i>
        )}
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
