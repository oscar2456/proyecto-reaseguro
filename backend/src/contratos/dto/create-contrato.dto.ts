import { ApiProperty } from "@nestjs/swagger";

export class CreateContratoDto {
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: true })
    nombre: string;
    @ApiProperty({ required: true })
    montoPrima: number; // Added the missing property

}
