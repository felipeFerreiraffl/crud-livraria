package com.livraria.DTO;

import com.livraria.model.Livro;

// Record para fazer o GET 
public record LivroResponseDTO(Long id, String titulo, String autor, String isbn, Integer unidades, Integer preco, String urlImagem) {
	public LivroResponseDTO(Livro livro) {
		this(livro.getId(), livro.getTitulo(), livro.getAutor(), livro.getIsbn(), livro.getUnidades(), 
				livro.getPreco(), livro.getUrlImagem());
	}
}	
