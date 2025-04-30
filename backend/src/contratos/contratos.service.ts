import { Injectable, NotFoundException } from '@nestjs/common'; // importa notfoundexception para manejar errores
import { CreateContratoDto } from './dto/create-contrato.dto'; // importa el dto para la creación de contratos
import { UpdateContratoDto } from './dto/update-contrato.dto'; // importa el dto para la actualización de contratos
import { PrismaService } from '../prisma/prisma.service'; // importa el servicio de prisma
import { OscarBarriosContrato } from '@prisma/client'; // importa el tipo de contrato

@Injectable() // indica que esta clase es un proveedor y puede ser inyectada
export class ContratosService {

  constructor(private prisma: PrismaService) { } // inyecta el servicio de prisma

  // crea un nuevo contrato
  async create(createContratoDto: CreateContratoDto): Promise<OscarBarriosContrato> {
    try { // intenta crear el contrato
      return await this.prisma.oscarBarriosContrato.create({ // utiliza el cliente de prisma para crear el contrato
        data: createContratoDto, // los datos para crear el contrato se toman del dto
      });
    } catch (error) { // captura cualquier error que ocurra durante la creación
      console.error('Error al crear el contrato:', error); // imprime el error en la consola
      throw new Error('No se pudo crear el contrato'); // lanza un nuevo error con un mensaje genérico
    }
  }

  // obtiene todos los contratos
  async findAll(): Promise<OscarBarriosContrato[]> {
    console.log('findAll contratos'); // imprime un mensaje en la consola
    return this.prisma.oscarBarriosContrato.findMany(); // utiliza el cliente de prisma para obtener todos los contratos
  }

  // obtiene un contrato por su id
  async findOne(id: number): Promise<OscarBarriosContrato> {
    try { // intenta encontrar el contrato
      const contrato = await this.prisma.oscarBarriosContrato.findUnique({ // utiliza el cliente de prisma para encontrar un contrato único por su id
        where: { id: id }, // busca el contrato con el id especificado
      });
      if (!contrato) { // si no se encuentra el contrato
        throw new NotFoundException(`Contrato con ID ${id} no encontrado`); // lanza una excepción notfoundexception
      }
      return contrato; // retorna el contrato encontrado
    } catch (error) { // captura cualquier error que ocurra durante la búsqueda
      console.error(`Error al obtener el contrato con ID ${id}:`, error); // imprime el error en la consola
      throw new NotFoundException(`Contrato con ID ${id} no encontrado`); // lanza una excepción notfoundexception
    }
  }

  // actualiza un contrato existente
  async update(id: number, updateContratoDto: UpdateContratoDto): Promise<OscarBarriosContrato> {
    try { // intenta actualizar el contrato
      return await this.prisma.oscarBarriosContrato.update({ // utiliza el cliente de prisma para actualizar el contrato
        where: { id: id }, // busca el contrato con el id especificado
        data: updateContratoDto, // los datos para actualizar el contrato se toman del dto
      });
    } catch (error) { // captura cualquier error que ocurra durante la actualización
      console.error(`Error al actualizar el contrato con ID ${id}:`, error); // imprime el error en la consola
      throw new Error(`No se pudo actualizar el contrato con ID ${id}`); // lanza un nuevo error con un mensaje genérico
    }
  }

  // elimina un contrato existente
  async remove(id: number): Promise<OscarBarriosContrato> {
    try { // intenta eliminar el contrato
      return await this.prisma.oscarBarriosContrato.delete({ // utiliza el cliente de prisma para eliminar el contrato
        where: { id: id }, // busca el contrato con el id especificado
      });
    } catch (error) { // captura cualquier error que ocurra durante la eliminación
      console.error(`Error al eliminar el contrato con ID ${id}:`, error); // imprime el error en la consola
      throw new Error(`No se pudo eliminar el contrato con ID ${id}`); // lanza un nuevo error con un mensaje genérico
    }
  }
}