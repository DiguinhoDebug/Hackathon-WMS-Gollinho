package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
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

    private LocalDateTime dataHora;

    @ManyToMany
    @JoinTable(name = "entrada_produto",
            joinColumns = @JoinColumn(name = "id_entrada"),
            inverseJoinColumns = @JoinColumn(name = "id_produto"))
    private List<Produto> produto;

    @ManyToMany
    @JoinTable(name = "entrada_fornecedor",
            joinColumns = @JoinColumn(name = "id_entrada"),
            inverseJoinColumns = @JoinColumn(name = "id_fornecedor"))
    private List<Fornecedor> fornecedor;
    private Integer quantidade;

    public Entrada(){}
}
