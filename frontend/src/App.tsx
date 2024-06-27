import React from 'react';
import TarefaListar from './Components/Pages/Tarefa/Tarefa-Consultar';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import ClienteCadastrar from './Components/Pages/Tarefa/Tarefa-Cadastrar';
import TarefaCadastrar from './Components/Pages/Tarefa/Tarefa-Cadastrar';
import TarefaAlterar from './Components/Pages/Tarefa/Tarefa-Alterar';

function App() {
  return (
    <div className="App">
      <h1>FrontEnd</h1>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li><Link to={"/pages/tarefas/listar"}>Listar e Alterar Tarefas</Link></li>
            <li><Link to={"/pages/tarefas/cadastrar"}>Cadastrar Tarefas</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/pages/tarefas/listar' element={<TarefaListar></TarefaListar>} />
          <Route path='/pages/tarefas/cadastrar' element={<TarefaCadastrar></TarefaCadastrar>} />
          <Route path='/pages/tarefas/alterar/:id' element={<TarefaAlterar></TarefaAlterar>} />
        </Routes>
      </BrowserRouter>
      <hr />
    </div>
  );
}

export default App;
