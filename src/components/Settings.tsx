import React from 'react';

import './Settings.scss';

type CloseEvent = React.KeyboardEvent | React.MouseEvent;

interface Props {
  name: string;
  updateName: (e: string) => void;
  closeSettings: (e: CloseEvent) => void;
}

function Settings({ name, updateName, closeSettings }: Props) {
  return (
    <main className="Settings">
      <div className="Settings-wrapper">
        <h2 className="Settings">Settings</h2>
        <span>Name of shopping list</span>
        <div>
          <input
            type="text"
            className="Settings"
            value={name}
            onChange={(e) => updateName(e.target.value)}
            onKeyUp={closeSettings}
          />
          <button className="btn-floating waves-effect waves-light amber" onClick={closeSettings}>
            <i className="material-icons">check</i>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Settings;
