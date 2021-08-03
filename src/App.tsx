import React, { useState } from 'react';

import Header from './components/Header';
import Settings from './components/Settings';
import Share from './components/Share';
import Main from './components/Main';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);

  let nameFromLocalStorage = localStorage.name;
  const defaultName = nameFromLocalStorage !== undefined ? nameFromLocalStorage : 'Shared Shopping';
  const [name, setName] = useState(defaultName);

  return (
    <>
      <Header handleSettings={() => setShowSettings(true)} name={name} handleShare={() => setShowShare(true)} />
      {showSettings && (
        <Settings
          name={name}
          updateName={(name: string) => setName(name)}
          closeSettings={(e) => {
            if (e.type === 'click') {
              setShowSettings(false);
            } else {
              if ((e as React.KeyboardEvent).code === 'Enter') setShowSettings(false);
            }
          }}
        />
      )}

      {showShare && <Share closeShare={() => setShowShare(false)} />}
      <Main />
    </>
  );
}

export default App;
