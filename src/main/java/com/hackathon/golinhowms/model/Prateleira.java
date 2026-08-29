package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Prateleira {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPrateleira;

    private Integer andar;
    private Integer coluna;
    private Integer corredor;
    private Integer quantidade;

    @ManyToOne
    private Produto produto;

    public Prateleira(){}
}