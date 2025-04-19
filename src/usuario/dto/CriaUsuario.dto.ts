import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class criaUsuarioDto {

    @IsNotEmpty({message:'O nome não pode ser vazio'})
    nome: string;
    
    @IsEmail( undefined, {message:'E-mail inválido'})
    email: string;
    
    @MinLength(6)
    senha: string;
}