import { produtosRepository } from './produtos.repository';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { criaProdutoDto } from './dto/CriarProdutos.dto';
import { ProdutosEntity } from './produtos.entity';
import { v4 as uuidv4 } from 'uuid';
import { ListarProdutosDTO } from './dto/ListarProdutos.dto';
import { AtualizaProdutoDto } from './dto/AtualizarProdutos.dto';

@Controller('/produtos') 
export class ProdutosController {

    constructor(private produtosRepository: produtosRepository) {}

    @Post()
    async criarProdutos(@Body() dadosProduto: criaProdutoDto) { // Adicionei os parênteses
        const produtosEntity = new ProdutosEntity();
        produtosEntity.id = uuidv4(); // Corrigi para usar no ID
        produtosEntity.nome = dadosProduto.nome;
        produtosEntity.preco = dadosProduto.preco;

        await this.produtosRepository.salvar(produtosEntity);

        return {
            message: 'Produto criado com sucesso', // Corrigi a mensagem
            statusCode: HttpStatus.CREATED,
            produto: new ListarProdutosDTO(produtosEntity.id, produtosEntity.nome, produtosEntity.preco)
        };
    }

    @Get()
    async listaDeProdutos() {
        const produtosSalvos = await this.produtosRepository.listar(); // Adicionei await
        return produtosSalvos.map(
            produto => new ListarProdutosDTO(
                produto.id,
                produto.nome,
                produto.preco
            )
        );
    }

    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDto) { // Renomeei para atualizaProduto
        const produtoAtualizado = await this.produtosRepository.atualiza(id, novosDados);
    
        return {
            produto: produtoAtualizado, // Mudei usuario para produto
            message: 'Produto atualizado com sucesso!' // Corrigi a mensagem
        };
    }
    
    @Delete('/:id')
    async removeProduto(@Param('id') id: string) { // Renomeei para removeProduto
        const produtoRemovido = await this.produtosRepository.remove(id);
    
        return {
            produto: produtoRemovido, // Mudei usuario para produto
            message: 'Produto removido com sucesso' // Corrigi a mensagem e ortografia
        };
    }
}