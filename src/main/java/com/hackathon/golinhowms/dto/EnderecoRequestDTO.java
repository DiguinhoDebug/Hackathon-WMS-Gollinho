package com.hackathon.golinhowms.dto;

import com.hackathon.golinhowms.model.Estados;

public record EnderecoRequestDTO(
        String nomeRua,
        String numeroRua,
        String bairro,
        String cidade,
        Estados estados
) {
}
