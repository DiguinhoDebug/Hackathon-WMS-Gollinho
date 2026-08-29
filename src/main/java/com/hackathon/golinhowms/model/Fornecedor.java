package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Fornecedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFornecedor;

    private String razaoSocial;
    private String nomeFantasia;
    private String cnpj;
    private Boolean status;

    @OneToOne
    private Endereco enderecos;

    @OneToMany(mappedBy = "fornecedor")
    private List<Produto> produtos;

    public Fornecedor(){}
}