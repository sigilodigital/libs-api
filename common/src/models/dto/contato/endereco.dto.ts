import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Validate } from 'class-validator';

import { EnderecoEntity } from "@sd-root/libs/common/src/models/entities/contato/endereco.entity";
import { IConstraintSchema } from "@sd-root/libs/common/src/models/interfaces/ConstraintsSchema";
import { ValidaSchema } from "@sd-root/libs/common/src/validations/schema.validate";
import { ContatoInputDto } from "./contato.dto";

export class EnderecoInputDto implements EnderecoEntity {

    @ApiProperty({ name: 'cep', type: Number, nullable: false, minLength: 8, maxLength: 8 })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'number', nullable: false, length: 8 }])
    zipCode: number;

    @ApiProperty({ name: 'country', type: String, nullable: false })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    country: string;

    @ApiProperty({ name: 'state', type: String, nullable: false })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    state: string;

    @ApiProperty({ name: 'city', type: String, nullable: false })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    city: string;

    @ApiProperty({ name: 'place', type: String, nullable: false, description: 'Logradouro (Ex: Quadra 307 Sul, Alameda Oscar Niemeyer)' })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    place: string;

    @ApiProperty({ name: 'number', type: String, nullable: false, description: 'Número (Ex: 101)' })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    number: string;

    @ApiProperty({ name: 'complement', type: String, nullable: false, description: 'Complemento (Ex: Bloco A, Apto 101)' })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    complement: string;

    @ApiProperty({ name: 'description', type: String, nullable: false })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    description: string;

    @ApiProperty({ name: 'description', type: String, nullable: false })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string', nullable: false }])
    _contato?: ContatoInputDto;

}

export class EnderecoOutputDto extends PartialType(EnderecoInputDto) { }
