import { ApiProperty } from "@nestjs/swagger";
import { Validate, ValidateNested } from "class-validator";
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

export abstract class ParamsDto implements IParamsDto {

    @ApiProperty()
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'object', required: false }])
    relations?: Object;

    @ApiProperty({ default: 10 })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'number', required: false }])
    take?: number;

    @ApiProperty({ default: 0 })
    @Validate(ValidaSchema, [<IConstraintSchema>{ type: 'number', required: false }])
    skip?: number;

}

export abstract class RequestAbstractDto extends EntityAbstractDto {

    @ApiProperty()
    @ValidateNested()
    __params?: ParamsDto;

}


export interface IParamsDto {
    relations?: Object;
    take?: number;
    skip?: number;
}