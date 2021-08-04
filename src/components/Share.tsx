import React, { useState, useEffect, useRef } from 'react';

import './Share.scss';

interface ResponseData {
  success: boolean;
  code: string;
  message?: string;
  password?: boolean;
  data?: Data[];
}

interface Data {
  categories: [];
  code: string;
  items: [];
  name: string;
  password: string;
}

interface Props {
  closeShare: (e: React.MouseEvent) => void;
}

let CODE = '';

function updateData(data: Data) {
  console.log(data);

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

function Settings({ closeShare }: Props) {
  let codeFromLocalStorage = localStorage.code || '';
  const [code, setCode] = useState(codeFromLocalStorage);
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [joinText, setJoinText] = useState(
    'If someone else has shared their code with you enter it here to collaborate on their list instead:'
  );

  const codeInput = useRef<HTMLInputElement>(null);
  const joinInput = useRef<HTMLInputElement>(null);
  const passwordButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    localStorage.code = code;
  }, [code]);

  async function enableShare() {
    const items = localStorage.items || '[]';
    const categories = localStorage.categories || '[]';
    const name = localStorage.name || '';
    const bodyData = { items, categories, name };
    const res: Response = await fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: ResponseData = await res.json();
    if (data.success) setCode(data.code);
  }

  function copyCode(e: React.MouseEvent) {
    if (!codeInput.current) return;
    codeInput.current.focus();
    codeInput.current.select();
    document.execCommand('copy');
    (e.target as HTMLInputElement).classList.add('Share-copy');
  }

  async function updatePassword() {
    if (passwordButton.current?.classList.contains('green')) return;

    const bodyData = { code, password };
    const res: Response = await fetch('/api/password', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: ResponseData = await res.json();
    if (data.success) {
      passwordButton.current?.classList.replace('amber', 'green');
    }
  }

  async function confirmCode() {
    if (joinInput.current?.type === 'password') {
      confirmPassword();
      return;
    }

    if (input.length !== 10) {
      setError('Please enter 10 characters.');
      return;
    }
    const bodyData = { code: input };
    const res: Response = await fetch('/api/join', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: ResponseData = await res.json();

    if (!data.success) {
      if (data.message) setError(data.message);
      return;
    }
    if (data.password) {
      setJoinText('This list requires a password, please provide it for access:');
      if (joinInput.current) {
        CODE = joinInput.current.value;
        joinInput.current.type = 'password';
        joinInput.current.value = '';
        joinInput.current.maxLength = 255;
        setInput('');
        joinInput.current.focus();
      }
    } else {
      if (data.data) updateData(data.data[0]);
    }
  }

  async function confirmPassword() {
    if (!input.length) {
      setError('Please provide a password.');
      return;
    }
    const bodyData = { code: CODE, password: input };
    const res: Response = await fetch('/api/compare', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: ResponseData = await res.json();
    if (!data.success) {
      setError('Incorrect password.');
    } else {
      if (data.data) updateData(data.data[0]);
    }
  }

  return (
    <main className="Share">
      <div className="Share-wrapper">
        <i className="material-icons Share-close" onClick={closeShare}>
          close
        </i>
        <h2 className="Share">Share</h2>
        <span>
          If you would like to share this list with someone click the enable button to generate your unique code.
        </span>
        <div className="Share-input-wrapper">
          <button
            className="btn waves-effect waves-light amber"
            style={{ marginRight: '1rem' }}
            onClick={enableShare}
            disabled={code.length !== 0}
          >
            Enable
          </button>
          <div>
            <input className="Share" type="text" readOnly value={code} ref={codeInput} />
            <i className="material-icons" onClick={copyCode}>
              content_copy
            </i>
          </div>
        </div>
        {code.length > 0 && (
          <>
            <span className="Share-extra-space">Create a password for your list or update it (optional):</span>
            <div className="Share-input-wrapper">
              <input
                className="Share"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordButton.current?.classList.replace('green', 'amber');
                }}
              />
              <button
                className="btn waves-effect waves-light amber"
                style={{ marginLeft: '1rem' }}
                onClick={updatePassword}
                ref={passwordButton}
              >
                Save
              </button>
            </div>
          </>
        )}
        <span className="Share-extra-space">{joinText}</span>
        <div className="Share-input-wrapper">
          <input
            maxLength={10}
            autoComplete="off"
            className="Share"
            type="text"
            ref={joinInput}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
            }}
          />
          <button className="btn waves-effect waves-light amber" onClick={confirmCode} style={{ marginLeft: '1rem' }}>
            Join
          </button>
        </div>
        <span className="Share-error" style={{ visibility: error ? 'visible' : 'hidden' }}>
          <i className="material-icons">error</i>
          {error}
        </span>
      </div>
    </main>
  );
}

export default Settings;
