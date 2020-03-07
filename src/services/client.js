export default class DataService {
  apiURL = 'http://www.filltext.com';
  getData = async () => {
    const res = await fetch(
      this.apiURL +
        '/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
    );
    if (!res.ok) {
      throw new Error(`Could not fetch data, received ${res.status}`);
    }
    return await res.json();
  };

  getBigData = async () => {
    const res = await fetch(
      this.apiURL +
        '/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    );
    if (!res.ok) {
      throw new Error(`Could not fetch data, received ${res.status}`);
    }
    return await res.json();
  };
}
