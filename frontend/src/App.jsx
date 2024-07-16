import { useEffect, useState } from "react";

export default function App() {

  //right not the message is the empty String, setMessage allows us to change that
  const [message, setMessage] = useState("");

  // [] is dependency array, keeping it empty means it runs one time
  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      
      // set the message to be the "msg" in the todos json 
      setMessage(todos.msg);
    }
    getTodos();
  }, [])
  return (
    <main className = "container">
      <h1>Awesome To Dos</h1>
      {/* only show the message if have message */}
      {message && <p>{message}</p>}
    </main>
  );
}

