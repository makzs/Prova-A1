import { useEffect, useState } from "react";
import { Tarefa } from "../../../Models/Tarefa";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../../../Models/Categoria";

function TarefaCadastrar(){

    const navigate = useNavigate();
    const[tarefas, setTarefas] = useState<Tarefa[]>([]);
    const[titulo, SetTitulo] = useState("");
    const[descricao, SetDescricao] = useState("");
    const[status, SetStatus] = useState("");
    const[categoriaId, SetCategoriaId] = useState("");
    const[categorias, SetCategorias] = useState<Categoria[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarCategorias();
            
    
        }, []);

        function carregarCategorias() {
            //FETCH ou AXIOS
            fetch("http://localhost:5000/categoria/listar")
              .then((resposta) => resposta.json())
              .then((categorias: Categoria[]) => {
                SetCategorias(categorias);
              });
          }

    function cadastrarTarefa(e : any){
        e.preventDefault();
        const tarefa : Tarefa = {
            titulo: titulo,
            descricao: descricao,
            status: status,
            categoriaId: categoriaId,
        };

        fetch("http://localhost:5000/tarefas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarefa),
        }).then((resposta) => resposta.json()).then((tarefa : Tarefa) =>
            {
                console.log(tarefa);
                SetTitulo("");
                SetDescricao("");
                SetStatus("");
                navigate("/pages/tarefas/listar");
            });
    }

    return (
        <div>
            <h1>Cadastrar Tarefa</h1>
            <form onSubmit={cadastrarTarefa}>
            <label>Titulo:</label>
            <input type="text" value={titulo} onChange={(e : any) => SetTitulo(e.target.value)} required />

            <label>Descrição:</label>
            <input type="text" value={descricao} onChange={(e : any) => SetDescricao(e.target.value)} required />

            <label>Status:</label>
            <input type="text" value={status} onChange={(e : any) => SetStatus(e.target.value)} required />

            <label>Categorias:</label>
            <select onChange={(e: any) => SetCategoriaId(e.target.value)}>
            {categorias.map((categoria) => (
                <option value={categoria.categoriaId} key={categoria.categoriaId}>
                {categoria.nome}
                </option>
            ))}
            </select>

            <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default TarefaCadastrar;