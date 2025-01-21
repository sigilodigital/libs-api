import { ApiProperty } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { ValidaSchema } from "../../validations/schema.validate";
import { IConstraintSchema } from "../interfaces/ConstraintsSchema";

export abstract class IdEntityAbstractDto {

    @ApiProperty({ name: 'id', type: String, nullable: false, required: true })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'string' }])
    id?: string;

}

export abstract class IsActiveEntityAbstractDto {

    @ApiProperty({ name: 'isActive', type: Boolean, nullable: true, required: false, default: true })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'boolean', required: false, nullable: true }])
    isActive: boolean;

}

export abstract class EntityAbstractDto
    extends IdEntityAbstractDto {

    @ApiProperty({ name: 'isActive', type: Boolean, nullable: true, required: false, default: true })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'boolean', required: false, nullable: true }])
    isActive: boolean;

}
