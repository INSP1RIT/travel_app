import { useState } from 'react';

const uuid = require('uuid');

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️Far away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState(1);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!description) return;

    const newItem = { description, selected, packed: false, id: uuid.v4() };
    console.log(newItem);

    setDescription('');
    setSelected(1);

    onAddItems(newItem);
  }

  return (
    <form className={'add-form'} onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍?</h3>
      <select
        value={selected}
        onChange={(event) => setSelected(+event.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type={'text'}
        placeholder={'Item...'}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.selected} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function PackingList({ items }) {
  return (
    <div className={'list'}>
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id}></Item>
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className={'stats'}>
      <em>You have X items for your list, and already packed X(X%)</em>
    </footer>
  );
}

export default App;
