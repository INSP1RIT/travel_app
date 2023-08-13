import { useState } from 'react';

const uuid = require('uuid');

export default function Form({ onAddItems }) {
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
