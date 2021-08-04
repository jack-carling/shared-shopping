import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Settings from './components/Settings';
import Share from './components/Share';
import Main from './components/Main';

interface ResponseData {
  success: boolean;
  time: number;
  data: Data;
}

interface Data {
  categories: [];
  code: string;
  items: [];
  name: string;
  password: string;
  time: number;
}

function App() {
  const [showSave, setShowSave] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const time = localStorage.time;
    const code = localStorage.code;
    if (!time) return;
    if (!code) return;
    getData(time, code);
  }, []);

  async function getData(time: number, code: string) {
    const res: Response = await fetch(`/api/list?code=${code}`);
    const data: ResponseData = await res.json();

    if (Number(time) < data.data.time) {
      localStorage.time = data.data.time;
      updateData(data.data);
    }
  }

  function updateData(data: Data) {
    if (data.categories.length) {
      localStorage.categories = JSON.stringify(data.categories);
    }
    if (data.items.length) {
      localStorage.items = JSON.stringify(data.items);
    }
    localStorage.name = data.name;
    localStorage.code = data.code;
    location.reload();
  }

  let nameFromLocalStorage = localStorage.name;
  const defaultName = nameFromLocalStorage !== undefined ? nameFromLocalStorage : 'Shared Shopping';
  const [name, setName] = useState(defaultName);

  function handleShowSave() {
    const code = localStorage.code;
    if (code) setShowSave(true);
  }

  async function saveAll() {
    const items = localStorage.items || '[]';
    const categories = localStorage.categories || '[]';
    const name = localStorage.name || '';
    const code = localStorage.code || '';
    const bodyData = { code, categories, items, name };
    const res: Response = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: ResponseData = await res.json();
    if (data.success) {
      setShowSave(false);
      localStorage.time = data.time;
    }
  }

  return (
    <>
      <Header
        showSave={showSave}
        handleSettings={() => setShowSettings(true)}
        name={name}
        handleShare={() => setShowShare(true)}
        handleSave={() => saveAll()}
        handleShowSave={() => handleShowSave()}
      />
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
      <Main handleShowSave={() => handleShowSave()} />
    </>
  );
}

export default App;
