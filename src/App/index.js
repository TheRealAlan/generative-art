import React, { useState } from 'react';
import Loadable from 'react-loadable';

import './App.css';

let Module = null;

function App() {
  const availableWorks = ['Cube', 'PointsLines'];
  const [active, setActive] = useState(null);

  const handleModule = (name) => {
    setActive(name);

    Module = Loadable({
      loader: () => import(`works/${name}`),
      loading: () => <div>Loading {name}...</div>,
    });
  };

  return (
    <div className="App">
      {active ? <Module /> : <div>No work loaded.</div>}
      <ul>
        {availableWorks.map((name, idx) => (
          <li
            key={idx}
            onClick={() => handleModule(name)}
            className={active === name ? 'is-active' : ''}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
