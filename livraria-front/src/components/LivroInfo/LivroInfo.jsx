import '../../styles/LivroInfo.css';
import React, { useEffect, useState } from "react";
import { deleteLivros, getLivros, updateLivros } from "../../services/api";
import Modal from "../Modal/Modal";
import NewButton from "../NewButton/NewButton";
import { LuPencil, LuXCircle } from 'react-icons/lu';

export default function LivroInfo() {
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
        <div className='app-livros'>
            <NewButton onClick={() => handleOpenModal(null)} />
            <ul className="app-livro-ls">
                {livros.map((livro, index) => (
                    <li key={index}>
                        <p className='app-livro-ls-isbn'>{livro.isbn}</p>

                        <div className='app-livro-ls-h'>
                            <button onClick={() => handleOpenModal(livro)}>
                                <LuPencil fontSize={20} />
                            </button>
                            <button onClick={() => handleDeleteLivros(livro.id)}>
                                <LuXCircle fontSize={20} />
                            </button>
                        </div>

                        <div className='app-livro-ls-main'>
                            <p className='app-livro-ls-title'>{livro.titulo}</p>
                            <p className='app-livro-ls-creator'>{livro.autor}</p>
                        </div>

                        <div className='app-livro-ls-infos'>
                            <p className='app-livro-ls-unities'>{livro.unidades}</p>
                            <p className='app-livro-ls-price'>R$ {livro.preco}</p>
                        </div>

                    </li>
                ))}
            </ul>
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