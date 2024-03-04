import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { MessageValidate } from './message.validate';

@ValidatorConstraint({ name: 'DataDefaulValueValidate',async:true})
export class DataDefaulValueValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataDefaulValueValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        DataDefaulValueValidate.exec(value, schema, args);

        return true;

    }

    static exec(value: string, schema: IConstraintSchema, args: ValidationArguments) {

        if (schema.default && !(<Array<any>>schema.default)?.includes(value))
            MessageValidate.exec(MSG.ERR_FIELD_VALUE, args, { className: DataDefaulValueValidate.LOG_CLASS_NAME });
    }
}