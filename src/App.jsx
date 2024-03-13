import React, { useEffect, useState } from 'react'
import './App.css'
import { RiDeleteBin3Fill, RiPlayListAddFill } from "react-icons/ri";
import { MdOutlineEdit, MdOutlineEditOff, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const App = () => {
  const [task, setTask] = useState("")
  const [todo, setTodo] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem('tasks')
    const themeFromLocalStorage = localStorage.getItem('theme')
    setTheme(themeFromLocalStorage)
    if (tasksFromLocalStorage) {
      setTodo(JSON.parse(tasksFromLocalStorage))
    }
  }, [])


  const addTodo = (e) => {
    e.preventDefault()
    if (task.length > 0) {
      const newTasks = [{ task, completed: false },...todo]
      setTodo(newTasks)
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    }
    setTask("")
    console.log(todo)
  }
  const deleteTask = (index) => {
    let copyTodoList = [...todo]
    copyTodoList.splice(index, 1)
    setTodo(copyTodoList)
    localStorage.setItem('tasks', JSON.stringify(copyTodoList))

  }
  const updateTask = (value, index, completed) => {
    if (!completed) {
      setTask(value)
      deleteTask(index)
    }
  }
  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')

    }
  }

  const handleCheck = (index) => {
    const updatedTodos = [...todo];
    if (updatedTodos[index]) {
      updatedTodos[index].completed = !updatedTodos[index].completed;
      setTodo(updatedTodos);
      localStorage.setItem('tasks', JSON.stringify(updatedTodos));
    }
  }
  const handleKeyDown =(e)=>{
    if(e.key ==='Enter'){
      addTodo(e)
    }
  }

  return (
    <div className={`min-h-screen flex items-center text-center flex-col pb-4 scroll ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
      <div className='flex justify-between w-full mt-4 px-6'>
        <h1 className={`font-extrabold text-2xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>MY TODO LIST</h1>
        <button className={`text-3xl ${theme === 'light' ? 'text-black' : 'text-white'}`} onClick={changeTheme}>{theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}</button>
      </div>

      <div className='w-full flex items-center justify-center mt-10 flex-col gap-2 sm:flex-row'>
        <input type="text" value={task} onChange={(e) => { setTask(e.target.value) }} onKeyDown={handleKeyDown} placeholder='Enter Your Task' className='bg-gray-300 p-3 w-[80%] rounded-md' />
        <button className='bg-gray-300 p-2 text-3xl rounded-md w-48 sm:w-auto flex justify-center' onClick={addTodo}><RiPlayListAddFill /></button>
      </div>
      {todo.reverse().map((todoItem, index) => (
        <div key={index} className={todoItem.completed ? 'bg-gray-200 w-[80%] mt-3 p-2 rounded-md flex justify-between items-center text-gray-500': 'bg-gray-300 w-[80%] mt-4 p-2 rounded-md flex justify-between items-center'}>
          <input type="checkbox" onChange={() => handleCheck(index)} checked={todoItem.completed} />
          <p className={`px-2 w-[70%] ${todoItem.completed && 'line-through'}`}>{todoItem.task}</p>
          <div className='flex gap-2'>
            <button className='text-xl text-green-600 sm:text-3xl' onClick={() => { updateTask(todoItem.task, index, todoItem.completed) }}>{todoItem.completed ? <MdOutlineEditOff /> : <MdOutlineEdit />}</button>
            <button className='text-xl text-red-600 sm:text-3xl' onClick={() => { deleteTask(index) }}><RiDeleteBin3Fill /></button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
