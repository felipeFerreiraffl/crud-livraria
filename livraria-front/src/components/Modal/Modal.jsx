import React, { useEffect, useState } from "react";
import { createLivros, fetchLivroImagem } from "../../services/api";

export default function Modal({ livro, onLivroCreated, onLivroUpdated, onClose }) {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [unidades, setUnidades] = useState(0);
    const [preco, setPreco] = useState(0);

    // Função que usa o POST para criar livros
    // Ou PUT para atualizar livros
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newLivro = { titulo, autor, isbn, unidades, preco };

        if (livro) {
            await onLivroUpdated({ ...newLivro, id: livro.id });
        } else {
            await createLivros(newLivro);
        }

        // Limpa o formulário
        setTitulo("");
        setAutor("");
        setIsbn("");
        setUnidades(0);
        setPreco(0);

        onClose();
        onLivroCreated();

    }

    useEffect(() => {
        if (livro) {
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setIsbn(livro.isbn);
            setUnidades(livro.unidades);
            setPreco(livro.preco);

        } else {
            setTitulo("");
            setAutor("");
            setIsbn("");
            setUnidades(0);
            setPreco(0);
        }

    }, [livro]);

    return (
        <div>
            <h1>{livro ? "Atualizar livro" : "Cadastrar livro"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="isbn"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="unidades"
                    value={unidades}
                    onChange={(e) => setUnidades(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                <button type="button" onClick={onClose}>Fechar</button>
                <button type="submit">{livro ? "Atualizar" : "Criar"}</button>
            </form>
        </div>
    );
}