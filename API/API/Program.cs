using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(
    options => options.AddPolicy("Acesso Total", configs => configs.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod())
);

builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/tarefas/listar
app.MapGet("/tarefas/listar", async ([FromServices] AppDataContext ctx) =>
{
    var emprestimos = await ctx.Tarefas
                              .Include(e => e.Categoria)
                              .ToListAsync();

    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// buscar por ID
//GET: http://localhost:5000/tarefas/buscar/id
app.MapGet("/tarefas/buscar/{id}", async ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{

    var emprestimos = await ctx.Tarefas
                              .Include(e => e.Categoria)
                              .ToListAsync();

    Tarefa? tarefaExistente = ctx.Tarefas.Find(id);

    if (tarefaExistente is null)
    {
        return Results.NotFound("Id requisitado nao encontrado na lista de produtos");
    }

    return Results.Ok(tarefaExistente);
});

//PUT: http://localhost:5000/tarefas/alterar/{id}
app.MapPut("/tarefas/alterar/{id}", ([FromRoute] string id, [FromBody] Tarefa tarefaAtualizada, [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefaExistente = ctx.Tarefas.Find(id);

    if (tarefaExistente is null)
    {
        return Results.NotFound("Id requisitado nao encontrado na lista de tarefas");
    }

    tarefaExistente.Titulo = tarefaAtualizada.Titulo;
    tarefaExistente.Descricao = tarefaAtualizada.Descricao;
    tarefaExistente.Status = tarefaAtualizada.Status;

    ctx.Tarefas.Update(tarefaExistente);
    ctx.SaveChanges();
    return Results.Ok($"Tarefa alterado com sucesso!");
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    List<Tarefa> tarefaList = new List<Tarefa>();

    if (ctx.Tarefas.Any())
    {
        foreach (var tarefa in ctx.Tarefas)
        {
            if (tarefa.Status == "Não iniciada" || tarefa.Status == "Em andamento")
            {
                tarefaList.Append(tarefa);

            }
        }
        return Results.Ok("Tarefas: " + tarefaList.ToList() + " nao foram concluidas ");
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    List<Tarefa> tarefaList = new List<Tarefa>();

    if (ctx.Tarefas.Any())
    {
        foreach (var tarefa in ctx.Tarefas)
        {
            if (tarefa.Status == "Concluida")
            {
                tarefaList.Append(tarefa);

            }
        }
        return Results.Ok("Tarefas: " + tarefaList.ToList() + " foram concluidas ");
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

app.UseCors("Acesso Total");
app.Run();
