import React from 'react';
import './Card.css';

const Card = React.memo(function Card({ id, name, status }) {
  const classNames = ['Card'];
  if (status === 'backlog') {
    classNames.push('Card-grey');
  } else if (status === 'in-progress') {
    classNames.push('Card-blue');
  } else if (status === 'complete') {
    classNames.push('Card-green');
  }

  return (
    <div
      className={classNames.join(' ')}
      data-id={id}
      data-status={status}
    >
      <div className="Card-title">{name}</div>
    </div>
  );
});

export default Card;