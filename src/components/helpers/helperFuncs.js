// Функция фильтрации массива объектов
// data - фильтруемый массив объектов
// string - строка фильтрации
// keys - массив ключей, по которым производится фильтрация
const filterData = (data, string, keys) => {
  if (!string || !data) return data;

  return data.filter(item => {
    return keys.some(key => {
      return item[key].toString().includes(string);
    });
  });
};

// Функция сортировки массива объектов
// data - фильтруемый массив объектов
// key - ключ, по которому производится фильрация
// isAscending - фильтрация по возрастанию или убыванию
const sortByKey = (data, key, isAscending) => {
  return data.sort((prev, next) => {
    let prevVal = prev[key];
    let nextVal = next[key];

    if ((typeof prev === typeof next) === 'number')
      return isAscending ? prevVal - nextVal : -(prevVal - nextVal);

    let res = prevVal < nextVal ? -1 : prevVal > nextVal ? 1 : 0;

    return isAscending ? res : -res;
  });
};

export { filterData, sortByKey };
