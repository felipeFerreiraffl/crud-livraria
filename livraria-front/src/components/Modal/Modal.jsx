import '../../styles/Modal.css';
import React, { useEffect, useState } from "react";
import { createLivros } from "../../services/api";
import defaultImg from '../../assets/default-img.png';

export default function Modal({ livro, onLivroCreated, onLivroUpdated, onClose }) {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [unidades, setUnidades] = useState("");
    const [preco, setPreco] = useState("");
    const [url, setUrl] = useState("");
    const [imgPreview, setImgPreview] = useState("");

    // Função que usa o POST para criar livros
    // Ou PUT para atualizar livros
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newLivro = { titulo, autor, isbn: Number(isbn), unidades: Number(unidades), preco: Number(preco), imagemUrl: url };

        if (livro) {
            await onLivroUpdated({ ...newLivro, id: livro.id });
        } else {
            await createLivros(newLivro);
        }

        // Limpa o formulário
        setTitulo("");
        setAutor("");
        setIsbn("");
        setUnidades("");
        setPreco("");
        setUrl("");
        setImgPreview("");

        onClose();
        onLivroCreated();

    }

    useEffect(() => {
        setImgPreview(url ? url : defaultImg);
    }, [url]);

    useEffect(() => {
        if (livro) {
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setIsbn(livro.isbn);
            setUnidades(livro.unidades);
            setPreco(livro.preco);
            setUrl(livro.imagemUrl || "");

        } else {
            setTitulo("");
            setAutor("");
            setIsbn("");
            setUnidades("");
            setPreco("");
            setUrl("");
        }

    }, [livro]);

    return (
        <div>
            <div className='app-modal-overlay'></div>

            <div className='app-modal'>
                <h1>{livro ? "Atualizar livro" : "Cadastrar livro"}</h1>

                <form className="app-modal-form" onSubmit={handleSubmit}>

                    <div className="app-modal-form-area">
                        <div>

                            <div className='app-modal-form-inp'>
                                <label htmlFor="title">Título</label>
                                <input
                                    id='title'
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>
                            <div className='app-modal-form-inp'>
                                <label htmlFor="creator">Autor</label>
                                <input
                                    id='creator'
                                    type="text"
                                    value={autor}
                                    onChange={(e) => setAutor(e.target.value)}
                                />
                            </div>
                            <div className='app-modal-form-inp'>
                                <label htmlFor="isbn">ISBN</label>
                                <input
                                    id='isbn'
                                    type="number"
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                />
                            </div>
                            <div className='app-modal-form-inp'>
                                <label htmlFor="unities">Unidades</label>
                                <input
                                    id='unities'
                                    type="number"
                                    value={unidades}
                                    onChange={(e) => setUnidades(e.target.value)}
                                />
                            </div>
                            <div className='app-modal-form-inp'>
                                <label htmlFor="price">Preço</label>
                                <input
                                    id='price'
                                    type="number"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className='app-modal-upload-img'>
                            <label htmlFor="url">URL da imagem</label>
                            <input
                                id='url'
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />

                            {imgPreview && (
                                <img src={imgPreview || defaultImg} alt="Pré-visualização" width={180} height={237} />
                            )}

                        </div>

                    </div>


                    <div className='app-modal-btn-area'>
                        <button className='app-modal-btn close' type="button" onClick={onClose}>Fechar</button>
                        <button className='app-modal-btn confirm' type="submit">{livro ? "Atualizar" : "Criar"}</button>
                    </div>

                </form>

            </div>

        </div>
    )
}