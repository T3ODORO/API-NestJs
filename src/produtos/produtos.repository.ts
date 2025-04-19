import { Injectable } from "@nestjs/common";
import { ProdutosEntity } from "./produtos.entity";

@Injectable()
export class produtosRepository { // Sugiro renomear para ProdutosRepository (convenção PascalCase)
    private produtos: ProdutosEntity[] = [];

    private buscaPorId(id: string) {
        const possivelProduto = this.produtos.find( // Corrigi o nome da variável
            produtoSalvo => produtoSalvo.id === id
        );

        if(!possivelProduto){
            throw new Error('Produto não existe');
        }

        return possivelProduto;
    }

    async salvar(produto: ProdutosEntity) {
        this.produtos.push(produto);
        return produto; // Adicionei retorno
    }

    async listar() {
        return this.produtos;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutosEntity>) {
        const produto = this.buscaPorId(id);
    
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') return;
            
            const key = chave as keyof ProdutosEntity;
            if (key in produto) {
                produto[key] = valor as never;
            }
        });
    
        return produto;
    }
    

    async remove(id: string) {
        const produto = this.buscaPorId(id);
        this.produtos = this.produtos.filter(
            produtoSalvo => produtoSalvo.id !== id
        );
        return produto;
    }
}