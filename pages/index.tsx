import { useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';

interface Event {
  preventDefault: () => void;
}

interface ChangeEvent {
  target: {
    value: string | number;
  };
}

export default function Home() {
  const [request, setRequest] = useState('');
  const [result, setResult] = useState();
  const [temp, setTemp] = useState(10);

  async function onSubmit(event: Event) {
    event.preventDefault();
    const response = await axios.post('/api/generate',
      JSON.stringify({ request, temperature: (temp / 10) }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.data;
    setResult(data.result);
    setRequest('');
  }

  return (
    <div>
      <main className={styles.main}>
        <h3>Input for AI:</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Enter input"
            value={request}
            onChange={(e: ChangeEvent) => setRequest(e.target.value as string)}
          />
        </form>
        <input
          type="range"
          min="0"
          max="10"
          onChange={(e) => setTemp((parseInt(e.target.value)))}
          value={temp}
        />
        <p>{`Temperature: ${temp / 10}`}</p>
        <pre
          style={{ whiteSpace: 'pre-wrap', width: '90vw' }}
          className={styles.result}
        >{result}</pre>
      </main>
    </div>
  );
}
