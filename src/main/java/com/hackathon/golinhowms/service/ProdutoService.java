package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.ProdutoRequestDTO;
import com.hackathon.golinhowms.dto.ProdutoResponseDTO;
import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.model.Produto;
import com.hackathon.golinhowms.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;


    public ProdutoService(ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
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

        Fornecedor fornecedor = fornecedorRepository

        produto.setNome(dto.nomeProduto());
        produto.setFornecedor(dto.idFornecedor());
    }
}
