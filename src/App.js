import React from 'react';
import Wrapper from './components/wrapper/Wrapper';
import Input from './components/input/Input';
import List from './components/list/List';
import { taskContext } from './Context';

function App() {
  return (
    <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <taskContext.Provider value={[{ _id: 1, name: 'Walk the dog' }, { _id: 2, name: 'Wash the dishes' }]}>
        <Wrapper >
          <h1>TODO</h1>
          <hr />
          <Input />
          <hr />
          <List />
        </Wrapper>
      </taskContext.Provider>
    </div>
  );
}

export default App;
