package com.livraria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livraria.DTO.LivroRequestDTO;
import com.livraria.DTO.LivroResponseDTO;
import com.livraria.model.Livro;
import com.livraria.repository.LivroRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/livraria")
public class LivroController {

	@Autowired
	LivroRepository repo;
	
	@GetMapping
	public List<LivroResponseDTO> getLivros() {
		// Trandsforma o DTO em uma lista
		List<LivroResponseDTO> livroList = repo.findAll().stream().map(LivroResponseDTO::new).toList();
		return livroList;
	}

	@PostMapping
	public LivroResponseDTO saveLivro(@RequestBody @Valid LivroRequestDTO data) {
		Livro livroData = new Livro(data);
		
		Livro savedLivro = repo.save(livroData);
		return new LivroResponseDTO(savedLivro);
	}
		
	@PutMapping("/{id}")
	public LivroResponseDTO updateLivro(@RequestBody @Valid LivroRequestDTO data, @PathVariable @Valid Long id) {
		Livro existingLivro = repo.findById(id)
				.orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));

		existingLivro.setTitulo(data.titulo());
		existingLivro.setAutor(data.autor());
		existingLivro.setIsbn(data.isbn());
		existingLivro.setUnidades(data.unidades());
		existingLivro.setPreco(data.preco());
		existingLivro.setImagemUrl(data.imagemUrl());
		
		Livro updatedLivro = repo.save(existingLivro);

		return new LivroResponseDTO(updatedLivro);

	}

	@DeleteMapping("/{id}")
	public void deleteLivro(@PathVariable @Valid Long id) {
		Livro existingLivro = repo.findById(id)
				.orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));

		repo.delete(existingLivro);
	}
}
