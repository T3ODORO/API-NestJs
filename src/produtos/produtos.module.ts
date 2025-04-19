import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { produtosRepository } from './produtos.repository';

@Module({
  controllers: [ProdutosController],
  providers: [produtosRepository],
  exports: [produtosRepository]
})
export class ProdutosModule {}
