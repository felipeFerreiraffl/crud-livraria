import React from 'react';
import '../../styles/NewButton.css';
import { LuPlus } from 'react-icons/lu';

export default function NewButton({ onClick }) {
    return (
        <button className="app-new-btn" onClick={onClick}>
            <div>
                <LuPlus />
                <p>Novo livro</p> 
            </div>
        </button>
    )
}
