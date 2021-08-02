import React, { useState } from 'react';

import Header from './components/Header';
import Settings from './components/Settings';
import Main from './components/Main';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  let nameFromLocalStorage = localStorage.name;
  const defaultName = nameFromLocalStorage !== undefined ? nameFromLocalStorage : 'Shared Shopping';
  const [name, setName] = useState(defaultName);

  return (
    <>
      <Header handleSettings={() => setShowSettings(true)} name={name} />
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
      <Main />
    </>
  );
}

export default App;
