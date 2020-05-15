import axios from "axios"
const baseUrl='/api/todos'
export const todoApi={
    getAllTodos(){
      return  axios.get(baseUrl)
    },
    getTodoByID(todoId){
      return axios.get(`${baseUrl}/${todoId}`)
    },
    addTodo(todoTitle){
      return axios.post(baseUrl,{title:todoTitle})
    },
    removeTodo(todoId){
      return axios.delete(`${baseUrl}/${todoId}`)
    }
}