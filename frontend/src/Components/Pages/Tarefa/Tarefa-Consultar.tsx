import { useEffect, useState } from "react";
import { Tarefa } from "../../../Models/Tarefa";
import { Link } from "react-router-dom";

function TarefaListar(){

    const[tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarTarefa();
            
    
        }, []);

    function carregarTarefa(){
        fetch("http://localhost:5000/tarefas/listar").then((resposta) => resposta.json()).then((tarefas : Tarefa[]) =>
            {
                setTarefas(tarefas);
                console.log("Tarefa carregada");
            })
    }

    return (
        <div>
            <style>{`
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
            `}</style>
            <h1>Lista de Tarefas</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>descricao</th>
                        <th>criadoEm</th>
                        <th>Categoria</th>
                        <th>categoriaId</th>
                        <th>status</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa, index) => (
                        <tr key={tarefa.tarefaId || index}>
                            <td>{tarefa.tarefaId}</td>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.criadoEm}</td>
                            <td>{tarefa.categoria?.nome}</td>
                            <td>{tarefa.categoriaId}</td>
                            <td>{tarefa.status}</td>
                            <td>
                                <Link to={`/pages/tarefas/alterar/${tarefa.tarefaId}`}>Alterar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TarefaListar;