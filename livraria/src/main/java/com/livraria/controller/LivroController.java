package com.livraria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.livraria.DTO.LivroRequestDTO;
import com.livraria.DTO.LivroResponseDTO;
import com.livraria.model.Livro;
import com.livraria.repository.LivroRepository;

@RestController
@RequestMapping("/livraria")
public class LivroController {

	@Autowired
	LivroRepository repo;
	
	private static final String GOOGLE_API_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

	@GetMapping
	public List<LivroResponseDTO> getLivros() {
		// Trandsforma o DTO em uma lista
		List<LivroResponseDTO> livroList = repo.findAll().stream().map(LivroResponseDTO::new).toList();
		return livroList;
	}

	@PostMapping
	public LivroResponseDTO saveLivro(@RequestBody LivroRequestDTO data) {
		Livro livroData = new Livro(data);
		
		Livro savedLivro = repo.save(livroData);
		return new LivroResponseDTO(savedLivro);
	}

	@PutMapping("/{id}")
	public LivroResponseDTO updateLivro(@RequestBody LivroRequestDTO data, @PathVariable Long id) {
		Livro existingLivro = repo.findById(id)
				.orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));

		existingLivro.setTitulo(data.titulo());
		existingLivro.setAutor(data.autor());
		existingLivro.setIsbn(data.isbn());
		existingLivro.setUnidades(data.unidades());
		existingLivro.setPreco(data.preco());
		existingLivro.setUrlImagem(data.urlImagem());
		
		Livro updatedLivro = repo.save(existingLivro);

		return new LivroResponseDTO(updatedLivro);

	}

	@DeleteMapping("/{id}")
	public void deleteLivro(@PathVariable Long id) {
		Livro existingLivro = repo.findById(id)
				.orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));

		repo.delete(existingLivro);
	}
}
