export default function Todo(props) {
    const { todo, setTodos } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status }; //it creates a new object that: Copies all properties (...currentTodo)., Overrides the status property with the new value (!currentTodo.status)
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE",
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.filter((currentTodo) => (currentTodo._id !== todoId));
            })
        }
    };

    return (
        <div className="todo">
            <p>{todo.todo}</p> {/* Display the todo text */}
            <div>
                <div className="button-container">
                    <button className="todo__status"
                        onClick={() => updateTodo(todo._id, todo.status)}>
                        <span className="emoji-container">
                            {(todo.status) ? "✅" : "☐"}            {/* Conditionally display a checkmark based on the todo status */}
                            <span className="emoji-text">Done</span> {/* Add text */}
                        </span>
                    </button>
                    <button
                        className="todo__delete"
                        onClick={() => deleteTodo(todo._id)}>
                        <span className="emoji-container">
                            🚮
                            <span className="emoji-text">Delete</span> {/* Add text */}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}