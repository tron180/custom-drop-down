import React from 'react';
import SelectBox from './SelectBox';
import data from './Data';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Custom Drop-Down</h1>
      <div style={{margin: '16px', position: 'relative'}}>
        <SelectBox 
          items={data}
          searchOnKey="name"
        />
      </div>
    </div>
  );
}

export default App;
