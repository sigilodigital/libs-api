import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, isDate } from 'class-validator';

import { ApiResponse } from '@libs/common/services/api-response-static';
import { IConstraintSchema } from '@sd-root/libs/common/src/models/interfaces/ConstraintsSchema';
import { IMessage, MSG } from '@libs/common/services/api-messages';
import { fnIsDate } from '../utils';
import { DataNullableValidate } from './data-nullable.validate';
import { DataTypeValidate } from './data-type.validate';
import { DataLengthValidate } from './data-length.validate';
import { DataDefaulValueValidate } from './data-default-value.validate';
import { DataRegularExpressionValidate } from './data-regular-expression.validate';
import { DataDateValidate } from './data-date.validate';

@ValidatorConstraint({ name: 'ValidaSchema', async: true })
export class ValidaSchema implements ValidatorConstraintInterface {
    static readonly LOG_CLASS_NAME = "ValidaSchema";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        // value = value?.toString();

        DataNullableValidate.exec(value, args, schema);
        DataTypeValidate.exec(value, args, schema);
        DataLengthValidate.exec(value, args, schema);
        DataDefaulValueValidate.exec(value, args, schema);
        DataRegularExpressionValidate.exec(value, args, schema);
        DataDateValidate.exec(value, args, schema);

        return true;
    }
}