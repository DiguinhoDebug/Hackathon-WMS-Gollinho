package com.hackathon.golinhowms.repository;

import com.hackathon.golinhowms.model.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EntradaRepository extends JpaRepository<Entrada, Long> {
    List<Entrada> findByDia(LocalDateTime dateTime);

}
