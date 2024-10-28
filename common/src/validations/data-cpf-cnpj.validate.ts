import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { validaCNPJ, validaCPF } from '../utils';
import { MessageValidate } from './message.validate';

@ValidatorConstraint({ name: 'DataCpfCnpjValidate', async: true })
export class DataCpfCnpjValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataCpfCnpjValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        DataCpfCnpjValidate.exec(value, args, schema);

        return true;
    }

    static exec(value: string, args: ValidationArguments, schema: IConstraintSchema) {

        value = value.toString().replace(/[^0-9]/g, '');

        switch (value.length) {
            case 11: if (validaCPF(value)) return true;
            case 14: if (validaCNPJ(value)) return true;
            default: MessageValidate.exec(MSG.ERR_FIELD_TYPE, args, { className: DataCpfCnpjValidate.LOG_CLASS_NAME });
        }

    }
}