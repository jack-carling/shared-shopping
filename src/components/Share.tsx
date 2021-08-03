import React, { useState, useEffect, useRef } from 'react';

import './Share.scss';

interface ResponseData {
  success: boolean;
  id: string;
}

interface Props {
  closeShare: (e: React.MouseEvent) => void;
}

function Settings({ closeShare }: Props) {
  let codeFromLocalStorage = localStorage.code || '';
  const [code, setCode] = useState(codeFromLocalStorage);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const codeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.code = code;
  }, [code]);

  async function enableShare() {
    const items = localStorage.items || [];
    const categories = localStorage.categories || [];
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
    if (data.success) setCode(data.id);
  }

  function copyCode(e: React.MouseEvent) {
    if (!codeInput.current) return;
    codeInput.current.focus();
    codeInput.current.select();
    document.execCommand('copy');
    (e.target as HTMLInputElement).classList.add('Share-copy');
  }

  function confirmCode() {
    if (input.length !== 10) {
      setError('Please enter 10 characters.');
      return;
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
              <input className="Share" type="password" />
              <button className="btn waves-effect waves-light amber" style={{ marginLeft: '1rem' }}>
                Save
              </button>
            </div>
          </>
        )}
        <span className="Share-extra-space">
          If someone else has shared their code with you enter it here to collaborate on their list instead:
        </span>
        <div className="Share-input-wrapper">
          <input
            maxLength={10}
            autoComplete="off"
            className="Share"
            type="text"
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
