import { useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';

interface Event {
  preventDefault: () => void;
}

interface ChangeEvent {
  target: {
    value: string;
  };
}

export default function Home() {
  const [request, setRequest] = useState('');
  const [result, setResult] = useState();

  async function onSubmit(event: Event) {
    event.preventDefault();
    const body = JSON.stringify({ request });
    const response = await axios.post('/api/generate', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
            onChange={(e: ChangeEvent) => setRequest(e.target.value)}
          />
        </form>
        <pre
          style={{ whiteSpace: 'pre-wrap', width: '90vw' }}
          className={styles.result}
        >{result}</pre>
      </main>
    </div>
  );
}
