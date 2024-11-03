package com.livraria.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.livraria.DTO.LivroRequestDTO;
import com.livraria.DTO.LivroResponseDTO;
import com.livraria.model.Livro;
import com.livraria.repository.LivroRepository;

@RestController
@RequestMapping("/livraria")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LivroController {
	
	@Autowired
	LivroRepository repo;
	
	@Value("${upload.dir}")
	private String uploadDir;
	
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
	
//	Upload de imagens ao um livro específico
	@PostMapping("/{id}/upload-imagem")
	public LivroResponseDTO uploadImg(@PathVariable Long id, @RequestParam("imagem") MultipartFile imagem) {
		Livro existingLivro = repo.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));
		
		try {
			File uploadDirFile = new File(uploadDir);
			if (!uploadDirFile.exists()) {
				uploadDirFile.mkdirs();
			}
			
			// Define o caminho a imagem
			String filePath = uploadDirFile.getPath() + "/" + imagem.getOriginalFilename();
			File destino = new File(filePath);
			
			// Salva o arquivo no disco
			imagem.transferTo(destino);
			
			existingLivro.setImagem(filePath);
			Livro updatedLivro = repo.save(existingLivro);
			
			return new LivroResponseDTO(updatedLivro);
			
		} catch (Exception e) {
			throw new RuntimeException("Erro ao salvar imagem", e);
		}
	}
	
	@PutMapping("/{id}")
	public LivroResponseDTO updateLivro(@RequestBody LivroRequestDTO data, @PathVariable Long id) {
		Livro existingLivro = repo.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));
		
		existingLivro.setTitulo(data.titulo());
		existingLivro.setAutor(data.autor());
		existingLivro.setIsbn(data.isbn());
		existingLivro.setUnidades(data.unidades());
		existingLivro.setPreco(data.preco());
		existingLivro.setImagem(data.imagem());
		
		Livro updatedLivro = repo.save(existingLivro);
		
		return new LivroResponseDTO(updatedLivro);
		
	}
	
	@DeleteMapping("/{id}")
	public void deleteLivro(@PathVariable Long id) {
		Livro existingLivro = repo.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado com id: " + id));
		
		repo.delete(existingLivro);
	}
}
