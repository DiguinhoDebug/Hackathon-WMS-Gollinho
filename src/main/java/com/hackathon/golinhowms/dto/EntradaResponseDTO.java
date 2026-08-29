package com.hackathon.golinhowms.dto;

import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.model.Produto;

import java.time.LocalDateTime;
import java.util.List;

public record EntradaResponseDTO(
        Long idEntrada,
        LocalDateTime dataHora,
        Produto produto,
        Fornecedor fornecedor,
        Integer quantidade
) {}
