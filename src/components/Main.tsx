import React, { useState, useRef } from 'react';
import './Main.scss';

import Item from './Item';
import Category from './Category';

function Main() {
  const defaultItems: string[] = [];
  const inputElement = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState(() => defaultItems);
  const [showTools, setShowTools] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [input, setInput] = useState('');

  function addItem() {
    if (!input) return;
    setItems((items) => [input, ...items]);
    setInput('');
    if (inputElement.current) inputElement.current.focus();
    if (edit !== -1) {
      setEdit((edit) => edit + 1);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.code !== 'Enter') return;
    addItem();
  }

  function editItem(e: React.MouseEvent, id: number, action: string) {
    if (action === 'edit') {
      if (edit === id) {
        setEdit(() => -1);
        return;
      }
      setEdit(() => id);
    }
    if (action === 'remove') {
      const newItems = [...items];
      newItems.splice(id, 1);
      setItems(() => [...newItems]);
    }
  }

  function handleEdit(e: React.FormEvent, id: number) {
    const element = e.target as HTMLSpanElement;
    let content = element.innerHTML as string;
    content = content.replaceAll('<div>', '');
    content = content.replaceAll('</div>', '');
    content = content.replaceAll('<br>', '');
    content = content.replaceAll('&nbsp;', '');
    content = content.trim();
    const newItems = [...items];
    newItems.splice(id, 1, content);
    setItems(() => [...newItems]);
  }

  return (
    <>
      <section className="Main">
        <input
          id="input-item"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => handleKey(e)}
          ref={inputElement}
          className="Main"
        />
        <button className="btn-floating waves-effect waves-light amber" onClick={addItem}>
          <i className="material-icons">add</i>
        </button>
        <button
          className="btn-floating waves-effect waves-light amber"
          onClick={() => {
            setShowTools(!showTools);
            setEdit(-1);
          }}
        >
          <i className="material-icons">edit</i>
        </button>
      </section>
      <Category />
      <ul>
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            id={index}
            edit={edit}
            show={showTools}
            clickHandler={(e, id, action) => editItem(e, id, action)}
            editHandler={(e, id) => handleEdit(e, id)}
          />
        ))}
      </ul>
    </>
  );
}

export default Main;
