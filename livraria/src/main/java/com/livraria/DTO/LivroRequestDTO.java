package com.livraria.DTO;

public record LivroRequestDTO(String titulo, String autor, Long isbn, Integer unidades, Integer preco, String imagemUrl) {

}
