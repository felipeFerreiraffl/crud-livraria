import React, { useEffect, useState } from "react";
import { createLivros } from "../services/api";

function Modal({ livro, onLivroCreated, onLivroUpdated, onClose }) {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [unidades, setUnidades] = useState(0);
    const [preco, setPreco] = useState(0);
    const [imagem, setImagem] = useState(null);

    // Função que usa o POST para criar livros
    // Ou PUT para atualizar livros
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newLivro = { titulo, autor, isbn, unidades, preco };

        if (livro) {
            await onLivroUpdated({ ...newLivro, id: livro.id });
        } else {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("autor", autor);
            formData.append("isbn", isbn);
            formData.append("unidades", unidades);
            formData.append("preco", preco);
            if (imagem) {
                formData.append("imagem", imagem);
            }

            await createLivros(newLivro);
            onLivroCreated();
        }

        // Limpa o formulário
        setTitulo("");
        setAutor("");
        setIsbn("");
        setUnidades(0);
        setPreco(0);
        setImagem(null);

        onClose();

    }

    useEffect(() => {
        if (livro) {
            setTitulo();
            setAutor();
            setIsbn();
            setUnidades();
            setPreco();
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
                <input
                    type="file"
                    accept="image/*" // Aceita apenas imagens
                    onChange={(e) => setImagem(e.target.files[0])}
                />
                <button type="button" onClick={onClose}>Fechar</button>
                <button type="submit">{livro ? "Atualizar" : "Criar"}</button>
            </form>
        </div>
    );
}

export default Modal;