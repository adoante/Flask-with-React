import {useState} from 'react';

function App() {

  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const testBackEnd = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('api/data');

      if (!response.ok) {
        throw new Error(`Failed to fetch data! Error: ${response.status}`);
      }

      const result = await response.json();
      console.log(JSON.stringify(result));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        {err && <h2>{err}</h2>}

        <button onClick={testBackEnd}>
          Check Backend
        </button>

        {isLoading && <h2>Loading...</h2>}

        <p>
          {data.message}
        </p>
    </>

  );
}

export default App;
