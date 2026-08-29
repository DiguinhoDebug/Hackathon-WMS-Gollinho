package com.hackathon.golinhowms.controller;

import com.hackathon.golinhowms.dto.FornecedorRequestDTO;
import com.hackathon.golinhowms.dto.FornecedorResponseDTO;
import com.hackathon.golinhowms.service.FornecedoresService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class FornecedorController {

    private final FornecedoresService fornecedorService;

    public FornecedorController(FornecedoresService fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    @GetMapping
    public List<FornecedorResponseDTO> listar() {
        return fornecedorService.listar();
    }

    @GetMapping("/{id}")
    public FornecedorResponseDTO buscarPorId(@PathVariable Long id) {
        return fornecedorService.buscarPorId(id);
    }

    @PostMapping
    public FornecedorResponseDTO salvar(@RequestBody FornecedorRequestDTO dto) {
        return fornecedorService.salvar(dto);
    }

    @PutMapping("/{id}")
    public FornecedorResponseDTO atualizar(@PathVariable Long id, @RequestBody FornecedorRequestDTO dto) {
        return fornecedorService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id, @Valid Boolean b) {
        fornecedorService.deletar(id, b);
    }
}
