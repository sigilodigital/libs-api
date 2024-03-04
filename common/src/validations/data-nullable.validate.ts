import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { MessageValidate } from './message.validate';

@ValidatorConstraint({ name: 'DataNullableValidate', async: true })
export class DataNullableValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataNullableValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        DataNullableValidate.exec(value, schema, args);

        return true;

    }

    static exec(value: string, schema: IConstraintSchema, args: ValidationArguments) {

        if ((!value) && !schema.nullable)
            MessageValidate.exec(MSG.ERR_FIELD_NULL, args, { className: DataNullableValidate.LOG_CLASS_NAME });
    }
}