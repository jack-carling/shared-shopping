import React, { useState, useRef } from 'react';
import './Main.scss';

import Item from './Item';

function Main() {
  const defaultItems: string[] = [];
  const inputElement = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState(() => defaultItems);
  const [showDelete, setShowDelete] = useState(false);
  const [input, setInput] = useState('');

  function addItem() {
    if (!input) return;
    setItems((items) => [input, ...items]);
    setInput('');
    if (inputElement.current) inputElement.current.focus();
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.code !== 'Enter') return;
    addItem();
  }

  return (
    <>
      <section className="Main">
        <div className="input-field inline">
          <input
            id="input-item"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => handleKey(e)}
            ref={inputElement}
          />
          <label htmlFor="input-item">New item</label>
        </div>
        <button className="btn amber" onClick={addItem}>
          <i className="material-icons left">add_circle</i>
          ADD
        </button>
        <button className="btn amber" onClick={() => setShowDelete(!showDelete)}>
          <i className="material-icons left">remove_circle</i>
          REMOVE ITEMS
        </button>
      </section>
      <ul>
        {items.map((item, index) => (
          <Item key={index} item={item} id={index} showDelete={showDelete} />
        ))}
      </ul>
    </>
  );
}

export default Main;
