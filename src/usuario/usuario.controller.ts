import { UsuarioEntity } from './usuario.entity';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { criaUsuarioDto } from './dto/CriaUsuario.dto';
import { v4 as uuidv4 } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}


    @Post()
  async criaUsuario(@Body() dadosUsuario: criaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity()
    usuarioEntity.nome = dadosUsuario.nome ;
    usuarioEntity.email = dadosUsuario.email ;
    usuarioEntity.senha = dadosUsuario.senha ;
    usuarioEntity.id = uuidv4();

    await this.usuarioRepository.salvar(usuarioEntity);


    return {
      message: 'Usuário criado com sucesso',
      statusCode: HttpStatus.CREATED,
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome)
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados)

    return {
      usuario: usuarioAtualizado,
      message: 'usuário atualizado com sucesso!'
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return {
      usuario: usuarioRemovido,
      message: 'Usuario removudo com sucesso'
    }
  }

}
