import {useState} from 'react';

function App() {

  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const testBackEnd = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/test');

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

  const [userData, setUserData] = useState({data: []});

  const handleUserSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    
    console.log(formObject);
    
    fetch('/api/post', {

      method: 'POST', 
      mode: 'cors', 
      body: formData // body data type must match "Content-Type" header

    })
  };

  const handleGetUserSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    
    console.log(formObject);
    
    fetch('/api/get_user', {

      method: 'POST', 
      mode: 'cors',
      body: formData 
    })
    .then((response) => response.json())
    .then((data) => {
      setUserData(data);
      console.log(data)
    })
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

        <form onSubmit={handleUserSubmit}>
          <input type="text" name="first_name" placeholder="first_name" />
          <input type="text" name="last_name" placeholder="last_name" />
          <input type="number" name="age" placeholder="age" />
          <button type="submit">Submit</button>
        </form>

        <form onSubmit={handleGetUserSubmit}>
          <input type="number" name="userId" placeholder="userId" />
          <button type="submit">Submit</button>
        </form>

        <p>
          Name: {userData.name} <br></br>
          Age: {userData.age} <br></br>
          Id: {userData.id}
        </p>
    </>

  );
}

export default App;
