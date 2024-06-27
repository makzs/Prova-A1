import { useEffect, useState } from "react";
import { Tarefa } from "../../../Models/Tarefa";
import { useNavigate, useParams } from "react-router-dom";
import { Categoria } from "../../../Models/Categoria";

function TarefaAlterar(){

    const { id } = useParams();
    const navigate = useNavigate();
    const[tarefas, setTarefas] = useState<Tarefa[]>([]);
    const[titulo, SetTitulo] = useState("");
    const[descricao, SetDescricao] = useState("");
    const[status, SetStatus] = useState("");

    useEffect(() => {
        if (id) {
          fetch(`http://localhost:5000/tarefas/buscar/${id}`)
            .then((resposta) => resposta.json())
            .then((tarefa: Tarefa) => {
              SetTitulo(tarefa.titulo);
              SetDescricao(tarefa.descricao);
              SetStatus(tarefa.status);
            })
            .catch((error) => {
              console.error("Erro ao carregar cliente:", error);
            });
        }
      }, []);

      

    function alterarTarefa(e : any){
        const tarefa : Tarefa = {
            titulo: titulo,
            descricao: descricao,
            status: status,
        };

        fetch(`http://localhost:5000/tarefas/alterar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarefa),
        }).then((resposta) => resposta.json()).then((tarefa : Tarefa) =>
            {
                navigate("/pages/tarefas/listar");
            });
            e.preventDefault();
    }

    return (
        <div>
            <h1>Alterar Tarefa</h1>
            <form onSubmit={alterarTarefa}>

            <label>Status:</label>
            <select onChange={(e: any) => SetStatus(e.target.value)}>
                <option value="Nao iniciada">Nao iniciado</option>
                <option value="Em andamento">andamento</option>
                <option value="Concluida">Concluida</option>
            </select>

            <button type="submit">Salvar</button>
            </form>
        </div>
    )
}

export default TarefaAlterar;