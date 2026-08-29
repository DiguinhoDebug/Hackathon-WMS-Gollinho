package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduto;

    private String nomeProduto;

    @ManyToOne
    private Fornecedor fornecedor;
    @ManyToOne
    private Entrada entrada;

    @ManyToOne
    private Prateleira prateleira;

    public Produto(){}
}
