package com.livraria.DTO;

public record LivroRequestDTO(String titulo, String autor, String isbn, Integer unidades, Integer preco, String imagem) {

}
