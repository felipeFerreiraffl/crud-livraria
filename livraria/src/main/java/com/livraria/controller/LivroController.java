package com.livraria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livraria.DTO.LivroRequestDTO;
import com.livraria.DTO.LivroResponseDTO;
import com.livraria.model.Livro;
import com.livraria.repository.LivroRepository;

@RestController
@RequestMapping("/livraria")
public class LivroController {
	
	@Autowired
	LivroRepository repo;
	
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping
	public List<LivroResponseDTO> getLivros() {
		// Trandsforma o DTO em uma lista
		List<LivroResponseDTO> livroList = repo.findAll().stream().map(LivroResponseDTO::new).toList();
		return livroList;
	}
	
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping
	public void saveLivro(@RequestBody LivroRequestDTO data) {
		Livro livroData = new Livro(data);
		repo.save(livroData);
	}
}
