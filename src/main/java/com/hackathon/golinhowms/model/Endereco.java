package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEndereco;

    private String nomeRua;
    private String numeroRua;
    private String bairro;
    private String cidade;

    @Enumerated(EnumType.STRING)
    private Estados estados;

    public Endereco(){};

}
