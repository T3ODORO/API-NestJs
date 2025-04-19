import { IsOptional } from "class-validator"

export class AtualizaProdutoDto {
    @IsOptional()
    nome: string
    @IsOptional()
    preco: number
    
}