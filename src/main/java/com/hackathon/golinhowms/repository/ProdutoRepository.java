package com.hackathon.golinhowms.repository;

import com.hackathon.golinhowms.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeProduto(String nomeProduto);
}
