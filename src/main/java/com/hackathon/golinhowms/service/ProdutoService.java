package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.ProdutoRequestDTO;
import com.hackathon.golinhowms.dto.ProdutoResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.model.Produto;
import com.hackathon.golinhowms.repository.FornecedorRepository;
import com.hackathon.golinhowms.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final FornecedorRepository fornecedorRepository;

    public ProdutoService(ProdutoRepository produtoRepository, FornecedorRepository fornecedorRepository){
        this.produtoRepository = produtoRepository;
        this.fornecedorRepository = fornecedorRepository;
    }

    private ProdutoResponseDTO toResponse(Produto produto){
        return new ProdutoResponseDTO(
                produto.getIdProduto(),
                produto.getNome(),
                produto.getFornecedor().getIdFornecedor(),
                produto.getFornecedor().getNomeFantasma(),
                produto.getPrateleira().getQuantidae()
        );
    }

    private Produto toEntity(ProdutoRequestDTO dto){
        Produto produto = new Produto();

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor()).orElseThrow(() -> new RecursoNaoEncontrado(""));

        produto.setNome(dto.nomeProduto());
        produto.setFornecedor(fornecedor);
    }
}
