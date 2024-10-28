import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { MessageValidate } from './message.validate';

@ValidatorConstraint({ name: 'DataRequiredValidate', async: true })
export class DataRequiredValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataRequiredValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];

        DataRequiredValidate.exec(value, args, schema);

        return true;
    }

    static exec(value: string, args: ValidationArguments, schema: IConstraintSchema) {

        if ((value === undefined) && schema.required)
            MessageValidate.exec(MSG.ERR_FIELD_NULL, args, { className: DataRequiredValidate.LOG_CLASS_NAME });
    }
}