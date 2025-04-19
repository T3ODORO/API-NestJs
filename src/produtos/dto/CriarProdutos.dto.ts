import { IsNotEmpty } from "class-validator";


export class criaProdutoDto {
    @IsNotEmpty({message:'O nome não pode ser vazio'})
    nome: string
    @IsNotEmpty({message:'O preço não pode ser vazio'})
    preco: number
    
}