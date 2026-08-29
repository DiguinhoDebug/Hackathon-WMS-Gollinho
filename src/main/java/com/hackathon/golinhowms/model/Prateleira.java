package com.hackathon.golinhowms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "prateleira", cascade = CascadeType.ALL)
    private List<Produto> produtos = new ArrayList<>();

    public Prateleira() {}
}
