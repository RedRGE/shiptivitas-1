// Board.js
import React, { useState, useEffect, useRef } from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

const getClients = () => (
  [
    ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'backlog'],
    ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'backlog'],
    ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
    ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'backlog'],
    ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'backlog'],
    ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
    ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
    ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
    ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
    ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
    ['11','Reilly-King','Future-Proofed Interactive Toolset', 'backlog'],
    ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
    ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'backlog'],
    ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
    ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'backlog'],
    ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'backlog'],
    ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'backlog'],
    ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
    ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
    ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
  ].map(([id, name, description, status]) => ({ id, name, description, status }))
);

const statusClassMap = {
  backlog: 'Card-grey',
  'in-progress': 'Card-blue',
  complete: 'Card-green',
};

export default function Board() {
  const swimlanes = {
    backlog: useRef(null),
    inProgress: useRef(null),
    complete: useRef(null),
  };

  const [clients, setClients] = useState(() => {
    const all = getClients();
    return {
      backlog: all.filter(c => !c.status || c.status === 'backlog'),
      inProgress: all.filter(c => c.status === 'in-progress'),
      complete: all.filter(c => c.status === 'complete'),
    };
  });

  useEffect(() => {
    const containers = Object.values(swimlanes).map(ref => ref.current);
    const drake = Dragula(containers);

    drake.on('drop', (el, target, source) => {
      const sourceStatus = source.getAttribute('data-status');
      const targetStatus = target.getAttribute('data-status');

      console.log('Source attributes:', source.attributes);
      console.log('Target attributes:', target.attributes);

      console.log(el, target, source);

      if (sourceStatus !== targetStatus) {
        el.classList.remove(statusClassMap[sourceStatus]);
        el.classList.add(statusClassMap[targetStatus]);
        el.setAttribute('data-status', targetStatus);
      }
    });

    return () => drake.destroy();
  }, []);

  const renderSwimlane = (title, list, ref, statusKey) => (
    <Swimlane name={title} clients={list} dragulaRef={ref} statusKey={statusKey} />
  );

  useEffect(() => {
    console.log('Clients updated:', clients);
  }, [clients]);

  return (
    <div className="Board">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            {renderSwimlane('Backlog', clients.backlog, swimlanes.backlog, 'backlog')}
          </div>
          <div className="col-md-4">
            {renderSwimlane('In Progress', clients.inProgress, swimlanes.inProgress, 'in-progress')}
          </div>
          <div className="col-md-4">
            {renderSwimlane('Complete', clients.complete, swimlanes.complete, 'complete')}
          </div>
        </div>
      </div>
    </div>
  );
}
