package com.livraria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.livraria.model.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {

}
