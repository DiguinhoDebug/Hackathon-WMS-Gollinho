package com.hackathon.golinhowms.repository;

import com.hackathon.golinhowms.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
