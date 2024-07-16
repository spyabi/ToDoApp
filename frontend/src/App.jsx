import { useEffect, useState } from "react";
import Todo from "./Todo"

export default function App() {

  //right now the todos is the empty array, setTodos allows us to change that
  const [todos, setTodos] = useState([]);

  const [content, setContent] = useState("");

  // [] is dependency array, keeping it empty means it runs one time
  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos"); //fetch defaults to GET
      //json response will be an array
      const todos = await res.json();
      
      // set the message to be the "msg" in the todos json 
      setTodos(todos);
    }
    getTodos();
  }, [])

  const createNewTodo = async (e) =>{     //e: Represents the event object passed to event handler functions.
    e.preventDefault();                   // prevent the page from refreshing
    if (content.length > 3){              // prevents ToDos shorter than 3 char
      const res = await fetch("/api/todos", {
        method: "POST", 
        body: JSON.stringify({todo: content}),
        headers:{
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, newTodo]); // Take all the current todos and attach the newtodo at the end //React will detect the change in state and rerender
      //Spread Operator (...): used to create a new array that includes all the elements of the existing todos array, followed by the newTodo element.
    }
  }




  return (
    <main className = "container">
      <h1 className = "title">Awesome To Dos</h1>
      <form className = "form" onSubmit={createNewTodo}>
        <input 
        type="text"
        value = {content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new todo..."
        className="form__input"
        required
        />
        <button type="submit">Create Todo</button>
      </form>
      <div className = "todos">
      {/* only show the todos if have todos array length > 0  */}
      {(todos.length > 0) && 
      todos.map((todo) => ( //map = standard array method in JavaScript used to iterate over an array and apply a function to each element
        <Todo key={todo._id} todo = {todo} setTodos={setTodos}/>


      ))
      }   
      </div>
    </main>
  );
}

