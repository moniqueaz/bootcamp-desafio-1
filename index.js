const express = require('express')
const server = express()

const projects = [{
  "id":001,
  "title":"Modelo",
  "tasks":["Descrição da primeira tarefa", "Descrição da segunda tarefa"]
}]

server.get('/', (req, res)=>{
  return res.json({"ok":"Olaaaa"})
})

/**
 * Roda que lista todos os projetos e suas tasks
 */
server.get('/projects', (req,res) =>{
  return res.json(projects)
})

/**
 * A rota deve receber id e title dentro corpo de cadastrar um novo projeto 
 * dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; 
 * Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com àspas duplas.
 */
server.post('/projects', (req, res)=>{
  projects.push(req.body)
  return res.json(projects)
})

/**
 * A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas 
 * de um projeto específico escolhido através do id presente nos parâmetros da rota
 */
server.post('/projects/:id/:tasks', (req,res) =>{
  const {id} = req.params
  const index = projects.map((proj, index)=>{
    if(proj.id === id) return index
  }).join('')
  projects[index].tasks.push(req.body.title)
  return res.json(projects)
})

/**
 * A rota deve alterar apenas o titulo do projeto com o id presente nos parametros da rota
 */
server.put('/projects/:id', (req,res) =>{
  const {id} = req.params
  const index = projects.map((proj, index)=>{
    if(proj.id === id) return index
  }).jpin('')
  projects[index].title = req.body.title
  return res.json(projects)
})

/**
 * A rota deve deletar o projeto com o id presente nos parâmetros da rota
 */
server.delete('/project/:id', (req, res) =>{
  const {id} = req.params
  project = projects.filter(proj => proj.id !== id)
  return res.json(projects)
})

server.listen(3000)