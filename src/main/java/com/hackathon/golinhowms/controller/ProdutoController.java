package com.hackathon.golinhowms.controller;

import com.hackathon.golinhowms.dto.ProdutoRequestDTO;
import com.hackathon.golinhowms.dto.ProdutoResponseDTO;
import com.hackathon.golinhowms.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController  {
    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<ProdutoResponseDTO> listar(){
        return produtoService.listar();
    }

    @GetMapping("/{id}")
    public ProdutoResponseDTO buscarPorId( @Valid @PathVariable Long id){
        return produtoService.buscarPorId(id);
    }

    @PostMapping
    public ProdutoResponseDTO salvar(@Valid @RequestBody ProdutoRequestDTO dto){
        return produtoService.salvar(dto);
    }

    @PutMapping("/{id}")
    public ProdutoResponseDTO atualizar(@Valid @PathVariable Long id, @Valid @RequestBody ProdutoRequestDTO dto){
        return produtoService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@Valid @PathVariable Long id){
        produtoService.deletar(id);
    }
}
