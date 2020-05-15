import axios from "axios"
const baseUrl='/api/todos'
export const todoApi={
    getAllTodos(){
      return  axios.get(baseUrl)
    },
    getTodoByID(todoId){
      return axios.get(`${baseUrl}/${todoId}`)
    }
}