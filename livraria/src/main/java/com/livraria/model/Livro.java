package com.livraria.model;

import com.livraria.DTO.LivroRequestDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "livro")
@Entity(name = "livro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Livro {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String titulo;
	
	@NotNull
	private String autor;
	
	@NotNull
	@Min(value = 10, message = "O ISBN deve ter pelo menos 10 números")
	private Long isbn;
	
	@NotNull
	private Integer unidades;
	
	@NotNull
	private Integer preco;
	
	private String imagemUrl;
	
	public Livro(LivroRequestDTO data) {
		this.titulo = data.titulo();
		this.autor = data.autor();
		this.isbn = data.isbn();
		this.unidades = data.unidades();
		this.preco = data.preco();
		this.imagemUrl = data.imagemUrl();
	}	
	
}	
