import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { MessageValidate } from './message.validate';

@ValidatorConstraint({ name: 'DataLengthValidate', async: true })
export class DataLengthValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataLengthValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        DataLengthValidate.exec(value, args, schema);

        return true;
    }

    static exec(value: string, args: ValidationArguments, schema: IConstraintSchema) {

        if (minLength(value, schema) || maxLength(value, schema) || orLength(value, schema))
            MessageValidate.exec(MSG.ERR_FIELD_LENGTH, args, { className: DataLengthValidate.LOG_CLASS_NAME });

        function minLength(value: string, schema: IConstraintSchema) {
            const r = (schema.minLength) ? value.length < schema.minLength : false;
            return r;
        }

        function maxLength(value: string, schema: IConstraintSchema) {
            const r = (schema.maxLength) ? value.length > schema.maxLength : false;
            return r;
        }

        function orLength(value: string, schema: IConstraintSchema) {
            const r = (schema.orLength) ? !(schema.orLength.includes(value.length)) : false;
            return r;
        }
    }
}