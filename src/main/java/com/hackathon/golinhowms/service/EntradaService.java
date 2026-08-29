package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.EntradaRequestDTO;
import com.hackathon.golinhowms.dto.EntradaResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Entrada;
import com.hackathon.golinhowms.repository.EntradaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntradaService {
    private final EntradaRepository repository;

    public EntradaService(EntradaRepository repository) {
        this.repository = repository;
    }
/*
    public EntradaResponseDTO toResponse(Entrada entrada){
        return new EntradaResponseDTO(
                entrada.getFornecedor().getNome(),

                entrada.getQuantidade(),
        )
    }

    public Entrada toEntity(EntradaRequestDTO dto){
        Entrada entrada = new Entrada();

        entrada.setDia(dto.dia);
        entrada.setFornecedor(dto.fornecedor);
        entrada.setProduto(dto.idProduto());
        entrada.setQuantidade(dto.quantidade());

        return entrada;
    }

    public List<EntradaResponseDTO> listar(){
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public Entrada pegarId(Long id){
        return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID da entrada nao encontrada"));
    }

    public EntradaResponseDTO salvar(EntradaRequestDTO dto){
        Entrada entrada = toEntity(dto);
        Entrada salvo = repository.save(entrada);
        return toResponse(salvo);
    }

    public EntradaResponseDTO atualizar(Long id, EntradaRequestDTO dto){
        Entrada entrada = pegarId(id);
        entrada.setDia(dto.dia);
        entrada.setFornecedor(dto.idFornecedor());
        entrada.setProduto(dto.idProduto());
        entrada.setQuantidade(dto.quantidade());
        Entrada salvo = repository.save(entrada);
        return toResponse(salvo);
    }

    public void deletar(Long id){
        Entrada entrada = pegarId(id);
        repository.delete(entrada);
    }

 */
}
