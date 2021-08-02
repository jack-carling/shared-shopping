import React, { useState, useRef, useEffect } from 'react';
import './Main.scss';

import Item from './Item';
import Category from './Category';

interface Items {
  name: string;
  checked: boolean;
  category: string;
}

function Main() {
  let itemsFromLocalStorage = localStorage.items;
  if (itemsFromLocalStorage) itemsFromLocalStorage = JSON.parse(itemsFromLocalStorage);
  const defaultItems: Items[] = itemsFromLocalStorage !== undefined ? itemsFromLocalStorage : [];
  const inputElement = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState(() => defaultItems);
  const [showTools, setShowTools] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('None');
  const [sortCategory, setSortCategory] = useState('Standard');

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.items = JSON.stringify(items);
  }, [items]);

  function addItem() {
    if (!input) return;
    setItems((items) => [{ name: input, checked: false, category: selectedCategory }, ...items]);
    setItems((items) => [...items].sort((a, b) => (a.category > b.category ? 1 : b.category > a.category ? -1 : 0)));
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
    newItems[id].name = content;
    setItems(() => [...newItems]);
    setEdit(() => -1);
  }

  function handleCheckbox(e: React.FormEvent, id: number) {
    const newItems = [...items];
    newItems[id].checked = !newItems[id].checked;
    setItems(() => [...newItems]);
  }

  function handleSortCategories() {
    setSortCategory((category) => (category === 'Standard' ? 'Most used' : 'Standard'));
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
        {items.length > 0 && (
          <button
            className="btn-floating waves-effect waves-light amber"
            onClick={() => {
              setShowTools(!showTools);
              setEdit(-1);
            }}
          >
            <i className="material-icons">edit</i>
          </button>
        )}
      </section>
      <span className="Main">Selected category: {selectedCategory}</span>
      <span className="Main">&nbsp;|&nbsp;</span>
      <span className="Main Main-sorting" onClick={handleSortCategories}>
        Sort categories by: {sortCategory} <i className="material-icons">sync</i>
      </span>
      <Category sortCategory={sortCategory} selectedCategory={(value: string) => setSelectedCategory(value)} />
      <ul className="Main">
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            id={index}
            edit={edit}
            show={showTools}
            clickHandler={(e, id, action) => editItem(e, id, action)}
            editHandler={(e, id) => handleEdit(e, id)}
            checkboxHandler={(e, id) => handleCheckbox(e, id)}
          />
        ))}
      </ul>
    </>
  );
}

export default Main;
