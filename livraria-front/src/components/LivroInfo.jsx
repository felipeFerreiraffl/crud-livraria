import React, { useEffect, useState } from "react";
import { deleteLivros, getLivros, updateLivros } from "../services/api";
import Modal from "./Modal";

function LivroInfo() {
    const [livros, setLivros] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [livroEdit, setLivroEdit] = useState(null);

    // Função que pega os livros no banco
    const handleCatchLivros = async () => {
        const data = await getLivros();

        if (data) {
            setLivros(data);
        }
    }

    const handleUpdateLivro = async (livro) => {
        const updatedData = await updateLivros(livro.id, livro);

        if (updatedData) {
            handleCatchLivros();
        }

    }

    const handleDeleteLivros = async (id) => {
        const sucessedData = await deleteLivros(id);

        if (sucessedData) {
            handleCatchLivros();
        }

    }

    // Função para abrir o modal
    const handleOpenModal = (livro = null) => {
        setLivroEdit(livro); // Caso o livro exista, entra em modo de editar
        setIsModalOpen(true);
    }

    // Função para fechar o modal
    const handleCloseModal = () => {
        setLivroEdit(null); // Limpa o livro ao fechar o editor
        setIsModalOpen(false);
    }

    // Função que atualiza a lista quando o livro é criado
    const handleLivroCreated = () => handleCatchLivros();

    useEffect(() => {
        handleCatchLivros();
    }, []);

    return (
        <div>
            <h1>Lista</h1>
            <ul>
                {livros.map((livro, index) => (
                    <li key={index}>
                        <p>título: {livro.titulo}</p>
                        <p>autor: {livro.autor}</p>
                        <p>isbn: {livro.isbn}</p>
                        <p>unidades: {livro.unidades}</p>
                        <p>preço: R$ {livro.preco}</p>
                        <img src={livro.imagem} alt={livro.titulo} />
                        <button onClick={() => handleOpenModal(livro)}>ATUALIZAR</button>
                        <button onClick={() => handleDeleteLivros(livro.id)}>DELETAR</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleOpenModal}>CRIAR</button>
            {isModalOpen && (
                <Modal
                    livro={livroEdit}
                    onClose={handleCloseModal}
                    onLivroCreated={handleLivroCreated}
                    onLivroUpdated={handleUpdateLivro}
                />
            )}
        </div>
    );
}

export default LivroInfo;