import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { MessageValidate } from './message.validate';

@ValidatorConstraint({ name: 'DataTypeValidate', async: true })
export class DataTypeValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataTypeValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        DataTypeValidate.exec(value, schema, args);

        return true;

    }

    static exec(value: string, schema: IConstraintSchema, args: ValidationArguments) {

        if(['true', 'false'].includes(value)) value = JSON.parse(value)
        if (schema.type && schema.type !== typeof value)
            MessageValidate.exec(MSG.ERR_FIELD_TYPE, args, { className: DataTypeValidate.LOG_CLASS_NAME });
    }
}