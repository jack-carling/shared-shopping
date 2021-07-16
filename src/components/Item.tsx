import React from 'react';

import './Item.scss';

type ItemProps = {
  id: number;
  item: string;
  show: boolean;
  edit: number;
  clickHandler: (e: React.MouseEvent<HTMLElement>, id: number, action: string) => void;
  editHandler: (e: React.FormEvent, id: number) => void;
};

function handleCheckbox(e: React.FormEvent) {
  const check = e.target as HTMLFormElement;
  console.log(check.checked);
}

function Item({ item, id, show, edit, clickHandler, editHandler }: ItemProps) {
  return (
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
            {item}
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
  );
}

export default Item;
