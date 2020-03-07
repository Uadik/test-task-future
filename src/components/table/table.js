import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';

import PageIndicator from '../page-indicator';
import { sortByKey, filterData } from '../helpers/helperFuncs';

import './table.css';

const Table = props => {
  const {
    headerData,
    tableData,
    rowsToDisplay,
    onItemSelected,
    onItemInserted
  } = props;

  // Текущая сортировка
  const [sorting, setSorting] = useState({
    sortingKey: '',
    isAscending: true
  });

  // Модель данных для отображения (отфильтрованная и отсортированная модель)
  const [proxyModel, setProxyModel] = useState(tableData);

  // Текущая фильтрация
  const [filterString, setFiltering] = useState('');

  // Текущая страница
  const [currentPage, setCurrentPage] = useState(0);

  // Признак добавления нового айтема и сам айтем
  const [insertMode, setInsertMode] = useState(false);
  const [insertItem, setInsertItem] = useState({});

  useEffect(() => {
    setProxyModel(props.tableData);
  }, [props.tableData]);

  // Функция переключения страницы
  const handlePage = nextPage => {
    if (
      nextPage < 0 ||
      nextPage > Math.floor(proxyModel.length / rowsToDisplay)
    )
      return;

    setCurrentPage(nextPage);
  };

  // Функция переключения сортировки
  const handleSorting = key => {
    let newSorting = {
      key,
      isAscending: key === sorting.key ? !sorting.isAscending : true
    };
    setSorting(newSorting);
    sortByKey(proxyModel, newSorting.key, newSorting.isAscending);
  };

  // Функция переключения фильтрации
  const handleFiltering = () => {
    const newProxyModel = filterData(
      tableData,
      filterString,
      headerData.map(item => item.key)
    );
    setProxyModel(newProxyModel);
    setCurrentPage(0);
  };

  // Функция рендера строки из одного элемента данных
  const renderRow = (item, index, headers) => {
    return (
      <tr
        key={index}
        onClick={() => {
          onItemSelected(item);
        }}
      >
        {headers.map(keyName => {
          if (typeof item[keyName] === 'object') return null;
          return <td key={keyName}>{item[keyName]}</td>;
        })}
      </tr>
    );
  };

  // Функция рендера строки добавления айтема
  const renderEditRow = keysData => {
    const keys = keysData.map(item => item.key);
    let isItemFilled = false;
    for (let key in keysData) {
      if (!insertItem[keys[key]]) {
        isItemFilled = false;
        break;
      } else isItemFilled = true;
    }

    return (
      <tr>
        {keysData.map(({ key, title }) => {
          return (
            <td key={key}>
              <input
                className="insert-input"
                type="text"
                placeholder={title}
                value={insertItem[key] || ''}
                onChange={e => {
                  setInsertItem({ ...insertItem, [key]: e.target.value });
                }}
              />
            </td>
          );
        })}
        {isItemFilled ? (
          <td className="insert-button-box">
            <button
              onClick={() => {
                onItemInserted(insertItem);
                setInsertItem({});
                setInsertMode(false);
              }}
            >
              +
            </button>
          </td>
        ) : null}
      </tr>
    );
  };

  return (
    <div>
      <div className="tools-panel">
        <span>
          <input
            type="text"
            value={filterString}
            onChange={e => {
              setFiltering(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleFiltering();
            }}
          >
            Найти
          </button>
        </span>
        <button
          onClick={() => {
            setInsertMode(!insertMode);
          }}
        >
          Добавить
        </button>
      </div>

      <ReactBootstrap.Table bordered striped hover>
        <thead>
          <tr>
            {headerData.map(item => {
              return (
                <th
                  key={item.key}
                  onClick={() => {
                    handleSorting(item.key);
                  }}
                >
                  {item.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {insertMode ? renderEditRow(headerData) : null}
          {proxyModel.map((item, index) => {
            const startIndex = currentPage * rowsToDisplay;
            if (index >= startIndex && index < startIndex + rowsToDisplay)
              return renderRow(
                item,
                index,
                headerData.map(header => header.key)
              );
            return null;
          })}
        </tbody>
      </ReactBootstrap.Table>

      <PageIndicator
        currentPage={currentPage}
        handlePage={handlePage}
        maxPage={Math.floor(proxyModel.length / rowsToDisplay)}
      />
    </div>
  );
};

export default Table;
