import React from 'react';

import './Item.scss';
import { allCategories } from './Category';

type ItemProps = {
  id: number;
  item: Item;
  show: boolean;
  edit: number;
  clickHandler: (e: React.MouseEvent<HTMLElement>, id: number, action: string) => void;
  editHandler: (e: React.FormEvent, id: number) => void;
};

type Item = {
  name: string;
  category: string;
};

function handleCheckbox(e: React.FormEvent) {
  const check = e.target as HTMLFormElement;
}

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

function Item({ item, id, show, edit, clickHandler, editHandler }: ItemProps) {
  return (
    <>
      <span className={`Item-Category${getCategoryNumber(item.category)}`}>{displayCategoryName(item.category)}</span>
      <li className="Item">
        <div className="Item-inputs">
          <label>
            <input onChange={handleCheckbox} type="checkbox" className="filled-in" />
            <span>&nbsp;</span>
          </label>
          <div>
            <span
              contentEditable={edit === id}
              onBlur={(e) => editHandler(e, id)}
              className="Item-text"
              suppressContentEditableWarning={true}
            >
              {item.name}
            </span>
          </div>
        </div>
        {show ? (
          <div className="Item-edit">
            <i className="material-icons" onClick={(e) => clickHandler(e, id, 'edit')}>
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
