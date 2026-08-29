package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.EntradaRequestDTO;
import com.hackathon.golinhowms.dto.EntradaResponseDTO;
import com.hackathon.golinhowms.dto.ProdutoResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Entrada;
import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.model.Produto;
import com.hackathon.golinhowms.repository.EntradaRepository;
import com.hackathon.golinhowms.repository.FornecedorRepository;
import com.hackathon.golinhowms.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EntradaService {
    private final EntradaRepository repository;
    private final FornecedorRepository fornecedorRepository;
    private final ProdutoRepository produtoRepository;

    public EntradaService(EntradaRepository repository, FornecedorRepository fornecedorRepository, ProdutoRepository produtoRepository) {
        this.repository = repository;
        this.fornecedorRepository = fornecedorRepository;
        this.produtoRepository = produtoRepository;
    }

    public EntradaResponseDTO toResponse(Entrada entrada){
        return new EntradaResponseDTO(
                entrada.getIdEntrada(),
                entrada.getDataHora(),
                entrada.getProduto(),
                entrada.getFornecedor(),
                entrada.getQuantidade()
        );
    }

    public Entrada toEntity(EntradaRequestDTO dto) {
        List<Produto> produtos = dto.idProduto().stream()
                .map(id -> produtoRepository.findById(id)
                        .orElseThrow(() -> new RecursoNaoEncontrado(
                                "ID do produto não encontrado: " + id
                        )))
                .toList();

        List<Fornecedor> fornecedores = dto.idFornecedor().stream()
                .map(id -> fornecedorRepository.findById(id)
                        .orElseThrow(() -> new RecursoNaoEncontrado(
                                "ID do fornecedor não encontrado: " + id
                        )))
                .toList();

        Entrada entrada = new Entrada();

        entrada.setDataHora(LocalDateTime.now());
        entrada.setProduto(produtos);
        entrada.setFornecedor(fornecedores);
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
        List<Produto> produtos = dto.idProduto().stream()
                .map(idProduto -> produtoRepository.findById(idProduto)
                        .orElseThrow(() -> new RecursoNaoEncontrado(
                                "ID do produto não encontrado: " + idProduto
                        )))
                .toList();

        List<Fornecedor> fornecedores = dto.idFornecedor().stream()
                .map(idFornecedores -> fornecedorRepository.findById(idFornecedores)
                        .orElseThrow(() -> new RecursoNaoEncontrado(
                                "ID do fornecedor não encontrado: " + idFornecedores
                        )))
                .toList();


        Entrada entrada = pegarId(id);

        entrada.setFornecedor(fornecedores);
        entrada.setProduto(produtos);
        entrada.setQuantidade(dto.quantidade());
        Entrada salvo = repository.save(entrada);
        return toResponse(salvo);
    }

    /*
    public void deletar(Long id){
        Entrada entrada = pegarId(id);
        repository.delete(entrada);
    }
    */

}
