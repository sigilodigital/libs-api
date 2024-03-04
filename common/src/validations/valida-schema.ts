import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, isDate } from 'class-validator';

import { ApiResponse } from '@libs/common/services/api-response-static';
import { IConstraintSchema } from '@sd-root/libs/common/src/models/interfaces/ConstraintsSchema';
import { IMessage, MSG } from '@libs/common/services/api-messages';
import { fnIsDate } from '../utils';

@ValidatorConstraint({ name: 'ValidaSchema', async: true })
export class ValidaSchema implements ValidatorConstraintInterface {
    LOG_CLASS_NAME = "ValidaSchema";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        this.validateNullable(value, schema, args);

        this.validateType(value, schema, args);

        this.validateLength(value, schema, args);

        this.validateDefaultValue(value, schema, args);

        this.validateRegularExpression(value, schema, args);

        this.validateDate(value, schema, args);

        return true;

    }

    validateNullable(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        if ((!value) && !schema.nullable)
            this.message(MSG.ERR_FIELD_N_INFO, args);
    }

    validateType(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        if (schema.type && schema.type !== typeof value)
            this.message(MSG.ERR_FIELD_TIPO, args);
    }

    validateLength(value: string, schema: IConstraintSchema, args: ValidationArguments) {

        if (minLength(value, schema) || maxLength(value, schema) || orLength(value, schema))
            this.message(MSG.ERR_FIELD_TAM, args);

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

    validateDefaultValue(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        if (schema.default && !(<Array<any>>schema.default)?.includes(value))
            this.message(MSG.ERR_FIELD_VALOR, args);
    }

    validateRegularExpression(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        const rgx = <RegExp><unknown>schema.regex;
        if (rgx && !rgx.test(value)) {
            (<IConstraintSchema>args.constraints[0]).regex = `/${rgx.source}/${rgx.flags}`;
            this.message(MSG.ERR_FIELD_VALOR, args);
        }
    }

    validateDate(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        if (schema.type === 'Date')
            if (fnIsDate(value)) this.message(MSG.ERR_FIELD_TIPO, args);
    }

    message(objMessage: IMessage, args: ValidationArguments) {
        const objError = ApiResponse.handler({
            objMessage: objMessage,
            property: args.property,
            valueArg: args.value,
            error: {
                message: `Validação do objeto ${args.targetName} :: propriedade: ${args.property}, valor: ${args.value}, tipo: ${typeof args.value}`,
                context: {
                    className: this.LOG_CLASS_NAME,
                    methodName: this.message.name,
                    input: {
                        targetName: args.targetName,
                        property: args.property,
                        value: args.value,
                        constraints: args.constraints,
                        object: args.object,
                    }
                }
            }
        });

        throw new HttpException(objError, HttpStatus.BAD_REQUEST);
    }

}