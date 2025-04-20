import React from 'react';
import Card from './Card';
import './Swimlane.css';

export default function Swimlane({ name, statusKey, clients, dragulaRef }) {

  console.log(`Swimlane: ${name}, Status Key: ${statusKey}`); 
  return (
    <div className="Swimlane-column">
      <div className="Swimlane-title">{name}</div>
      <div
        className="Swimlane-dragColumn"
        ref={dragulaRef}
        data-status={statusKey} 
      >
        {clients.map(client => (
          <Card
            key={client.id}
            id={client.id}
            name={client.name}
            description={client.description}
            status={client.status}
          />
        ))}
      </div>
    </div>
  );
}