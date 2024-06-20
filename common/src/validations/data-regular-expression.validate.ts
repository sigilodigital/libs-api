import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IConstraintSchema } from '../models/interfaces/ConstraintsSchema';
import { MSG } from '../services/api-messages';
import { MessageValidate } from './message.validate';

@ValidatorConstraint({ name: 'DataRegularExpressionValidate', async: true })
export class DataRegularExpressionValidate implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "DataRegularExpressionValidate";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        // value = value.toString();

        DataRegularExpressionValidate.exec(value, args, schema);

        return true;

    }

    static exec(value: string, args: ValidationArguments, schema: IConstraintSchema) {

        const rgx = <RegExp><unknown>schema.regex;
        // let rgx: RegExp
        // if ('string' == typeof schema.regex)
        //     const reg = /^\/[^\/]/.test(schema.regex)
        //     rgx = new RegExp(schema.regex)
        // else rgx = schema.regex;

        if (rgx && !rgx.test(value)) {
            (<IConstraintSchema>args.constraints[0]).regex = new RegExp(`${rgx.source}`, `${rgx.flags}`);
            MessageValidate.exec(MSG.ERR_FIELD_VALUE, args, { className: DataRegularExpressionValidate.LOG_CLASS_NAME });
        }
    }
}