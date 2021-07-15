import React from 'react';

import './Item.scss';

type ItemProps = {
  id: number;
  item: string;
  showDelete: boolean;
};

type DeleteButton = {
  show: boolean;
};

function handleCheckbox(e: any) {
  console.log(e.target.checked);
}

function DeleteButton({ show }: DeleteButton) {
  if (show) {
    return <i className="material-icons">remove_circle</i>;
  }
  return <></>;
}

function Item({ item, id, showDelete }: ItemProps) {
  return (
    <li className="Item">
      <div>
        <label>
          <input onChange={handleCheckbox} type="checkbox" className="filled-in" />
          <span>&nbsp;</span>
        </label>
        <span>{item}</span>
      </div>
      <DeleteButton show={showDelete} />
    </li>
  );
}

export default Item;
