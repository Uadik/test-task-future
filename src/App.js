import React, { useState, useEffect } from 'react';

import DataService from './services/client';
import Table from './components/table';
import Details from './components/details';
import Spinner from './components/spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const service = new DataService();

const App = () => {
  const [state, setState] = useState({
    isLoading: true,
    data: {},
    dataIsBig: false
  });
  const [displayedItem, setDisplayedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = state.dataIsBig
        ? await service.getBigData()
        : await service.getData();
      setState({ ...state, isLoading: false, data });
    };

    fetchData();
  }, [state.dataIsBig]);

  const headers = [
    { key: 'id', title: 'ID' },
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' }
  ];

  const handleInsertItem = item => {
    setState({ ...state, data: [item, ...state.data] });
  };

  return (
    <div className="App container">
      <div>
        <button
          onClick={() =>
            setState({ data: {}, dataIsBig: !state.dataIsBig, isLoading: true })
          }
          disabled={state.isLoading}
        >
          {state.dataIsBig ? 'Хочу мало данных' : 'Хочу много данных'}
        </button>
      </div>

      {state.isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Table
            headerData={headers}
            tableData={state.data}
            rowsToDisplay={50}
            onItemSelected={setDisplayedItem}
            onItemInserted={handleInsertItem}
          ></Table>
          {displayedItem ? <Details item={displayedItem} /> : null}
        </div>
      )}
    </div>
  );
};

export default App;
