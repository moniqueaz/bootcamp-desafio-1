const express = require('express')
const server = express()
server.use(express.json());

const projects = [{
  "id": "001",
  "title": "Modelo",
  "tasks": ["Descrição da primeira tarefa", "Descrição da segunda tarefa"]
}]
let count =  0

function getIndexProject(id){
  return projects.map((proj, index)=>{
      if(proj.id === id) return index
    }).join('')
}

/**
 * Checa se o id já existe e informa
 */
function checkIdExists(req,res,next){
  if(req.body.id){
    if(getIndexProject(req.body.id)) 
      return res.status(400).json({error: "project id exists"})
  }else{
    if(!getIndexProject(req.params.id))
      return res.status(400).json({error: "project id not exists"})
  }
  return next()
}

function checkIdWasInformed(req,res,next){
  console.log('req: ', req.body);
  if(!req.body.id){
    return res.status(400).json({error: "project id is requeired"})
  }
  return next()
}

function checkTitleWasInformed(req,res,next){
  if(!req.body.title){
    return res.status(400).json({error: "project title is requeired"})
  }
  return next()
}

function checkTasksWasInformed(req,res,next){
  if(!req.body.title){
    return res.status(400).json({error: "project tasks is requeired"})
  }
  return next()
}

/**
 * Global que conta as requisições
 */
server.use((req, res, next)=>{
  count += 1
  console.time("Resquest");
  console.log(`Request: ${count}`)
  console.log(`Method: ${req.method}; URL: ${req.url}`)
  next()
  console.timeEnd("Resquest");
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
server.post('/projects', checkIdExists, checkIdWasInformed, checkTitleWasInformed, (req, res)=>{
  if(!req.body.tasks) req.body.tasks = []
  projects.push(req.body)
  return res.json(projects)
})

/**
 * A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas 
 * de um projeto específico escolhido através do id presente nos parâmetros da rota
 */
server.post('/projects/:id/:tasks', checkIdExists, checkTasksWasInformed, (req,res) =>{
  const {id} = req.params
  const index = getIndexProject(id)
  projects[index].tasks.push(req.body.title)
  return res.json(projects)
})

/**
 * A rota deve alterar apenas o titulo do projeto com o id presente nos parametros da rota
 */
server.put('/projects/:id', checkIdExists, (req,res) =>{
  const {id} = req.params
  const index = getIndexProject(id)
  projects[index].title = req.body.title
  return res.json(projects)
})

/**
 * A rota deve deletar o projeto com o id presente nos parâmetros da rota
 */
server.delete('/projects/:id', checkIdExists, (req, res) =>{
  const {id} = req.params
  projects.splice(getIndexProject(id), 1)
  return res.json(projects)
})

server.listen(3000)