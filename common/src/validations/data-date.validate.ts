import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { MessageValidate } from './message.validate';
import { fnIsDate } from '../utils';

@ValidatorConstraint({ name: 'DataDateValidate', async: true })
export class DataDateValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataDateValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        DataDateValidate.exec(value, args, schema);

        return true;

    }

    static exec(value: string, args: ValidationArguments, schema: IConstraintSchema) {

        if (schema.type === 'Date')
            if (fnIsDate(value)) MessageValidate.exec(MSG.ERR_FIELD_TYPE, args, { className: DataDateValidate.LOG_CLASS_NAME });
    }
}