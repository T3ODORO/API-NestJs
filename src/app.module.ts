import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioRepository } from './usuario/usuario.repository';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutosModule } from './produtos/produtos.module';


@Module({
  imports: [UsuarioModule, ProdutosModule]
})
export class AppModule {}
