import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Api from './components/Api'


function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    Api.get('/todo').then(res => {
      console.log(res);
      setTodos(res.data);
    })
  }, [])


  return (
    <div >
      <Navbar />

      <TodoForm setTodos = {setTodos} todos = {todos} />
      
      {todos && <TodoList todos = {todos} setTodos = {setTodos} />}
    </div>
  );
}

export default App;
