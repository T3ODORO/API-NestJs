import { IsNotEmpty, IsEmail, MinLength, IsOptional } from "class-validator";

export class AtualizaUsuarioDTO {
        @IsNotEmpty({message:'O nome não pode ser vazio'})
        @IsOptional()
        nome: string;
        
        @IsEmail( undefined, {message:'E-mail inválido'})
        @IsOptional()
        email: string;
        
        @MinLength(6)
        @IsOptional()
        senha: string;
}