package com.hackathon.golinhowms.repository;

import com.hackathon.golinhowms.model.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

    List<Fornecedor> findByNomeFantasma(String nomeFantasma);
}
