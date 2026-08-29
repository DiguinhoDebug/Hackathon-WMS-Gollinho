package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @OneToMany(mappedBy = "produto")
    private List<Prateleira> prateleiras;

    public Produto(){}
}