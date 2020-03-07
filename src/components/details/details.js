import React from 'react';

const Details = props => {
  const { item } = props;
  return (
    <div>
      <p>
        Выбран пользователь <b>{`${item.firstName} ${item.lastName}`}</b>
      </p>
      <p>Описание:</p>
      <textarea cols="60" rows="7" value={item.description} readOnly />
      <p>
        Адрес проживания: <b>{`${item.address.streetAddress}`}</b>
      </p>
      <p>
        Город: <b>{`${item.address.city}`}</b>
      </p>
      <p>
        Провинция/штат: <b>{`${item.address.state}`}</b>
      </p>
      <p>
        Индекс: <b>{`${item.address.zip}`}</b>
      </p>
    </div>
  );
};

export default Details;
