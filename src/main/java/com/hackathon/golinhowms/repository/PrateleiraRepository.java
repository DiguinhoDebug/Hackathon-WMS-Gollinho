package com.hackathon.golinhowms.repository;

import com.hackathon.golinhowms.model.Prateleira;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrateleiraRepository extends JpaRepository<Prateleira, Long> {
    Optional<Prateleira> findByAndarAndColunaAndCorredor(Integer andar, Integer coluna, Integer corredor);
}