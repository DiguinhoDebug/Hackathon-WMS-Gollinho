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

    private String razaoSocial; //talvez nao e para usar
    private String nomeFantasia;
    private String cnpj;
    private Boolean status; //ativo ou inativo

    @OneToOne
    private Endereco enderecos;
    @OneToMany
    private List<Produto> produtos;
    @ManyToOne
    private Entrada entrada;

    public Fornecedor(){};
}
