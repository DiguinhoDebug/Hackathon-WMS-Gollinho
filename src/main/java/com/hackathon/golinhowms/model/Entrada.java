package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Entrada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEntrada;
    @Timestamp
    private LocalDateTime dataHora;
    @OneToMany
    private List<Produto> produto;
    @OneToMany
    private List<Fornecedor> fornecedor;
    private Integer quantidade;

    public Entrada(){}
}
