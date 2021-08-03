import React, { useRef } from 'react';

import './Item.scss';
import { allCategories } from './Category';

type ItemProps = {
  id: number;
  item: Item;
  show: boolean;
  edit: number;
  clickHandler: (e: React.MouseEvent<HTMLElement>, id: number, action: string) => void;
  editHandler: (e: React.FormEvent, id: number) => void;
  checkboxHandler: (e: React.FormEvent, id: number) => void;
};

type Item = {
  name: string;
  checked: boolean;
  category: string;
};

function getCategoryNumber(category: string) {
  if (category === 'None') {
    return '';
  }
  const found = allCategories.find((x) => x.name === category);
  return found?.id;
}

function displayCategoryName(category: string) {
  if (category === 'None') {
    return 'Uncategorized';
  }
  return category;
}

function Item({ item, id, show, edit, clickHandler, editHandler, checkboxHandler }: ItemProps) {
  const spanRef = useRef<HTMLElement>(null);

  function handleFocus() {
    setTimeout(() => {
      const element = spanRef.current;
      if (!element) return;
      const length = element.innerHTML.length;
      const range = document.createRange();
      const selection = window.getSelection();
      if (!range) return;
      range.setStart(element.childNodes[0], length);
      range.collapse(true);
      if (!selection) return;
      selection.removeAllRanges();
      selection.addRange(range);
      element.focus();
    }, 10);
  }

  return (
    <>
      <span className={`Item-Category${getCategoryNumber(item.category)}`}>{displayCategoryName(item.category)}</span>
      <li className="Item">
        <div className="Item-inputs">
          <label>
            <input
              onChange={(e) => checkboxHandler(e, id)}
              type="checkbox"
              checked={item.checked}
              className="filled-in"
            />
            <span>&nbsp;</span>
          </label>
          <div>
            <span
              contentEditable={edit === id}
              onBlur={(e) => editHandler(e, id)}
              onKeyUp={(e) => {
                if (e.code === 'Enter') editHandler(e, id);
              }}
              className="Item-text"
              suppressContentEditableWarning={true}
              ref={spanRef}
            >
              {item.name}
            </span>
          </div>
        </div>
        {show ? (
          <div className="Item-edit">
            <i
              className="material-icons"
              onClick={(e) => {
                clickHandler(e, id, 'edit');
                handleFocus();
              }}
            >
              edit
            </i>
            <i className="material-icons" onClick={(e) => clickHandler(e, id, 'remove')}>
              remove_circle
            </i>
          </div>
        ) : (
          <></>
        )}
      </li>
    </>
  );
}

export default Item;
