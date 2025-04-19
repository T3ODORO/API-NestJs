export class ListarProdutosDTO {
        constructor(
            public readonly id: string,
            public readonly nome: string,
            public readonly preco: number
        ) {}
    }