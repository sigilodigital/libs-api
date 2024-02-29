import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ApiResponse } from '@libs/common/services/api-response-static';
import { IConstraintSchema } from '@sd-root/libs/common/src/models/interfaces/ConstraintsSchema';
import { IMessage, MSG } from '@libs/common/services/api-messages';

@ValidatorConstraint({ name: 'ValidaSchema', async: true })
export class ValidaSchema implements ValidatorConstraintInterface {
    LOG_CLASS_NAME = "ValidaSchema";

    async validate(value: string, args: ValidationArguments) {

        const schema = <IConstraintSchema>args.constraints[0];
        value = value.toString();

        this.validaNulo(value, schema, args);

        this.validaTipo(value, schema, args);

        this.validaTamanho(value, schema, args);

        this.validaValorPadrao(value, schema, args);

        this.validaExpressaoRegular(value, schema, args);

        return true;

    }

    validaNulo(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        if ((!value) && !schema.nullable)
            this.message(MSG.ERR_FIELD_N_INFO, args);
    }

    validaTipo(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        if (schema.type && schema.type !== typeof value)
            this.message(MSG.ERR_FIELD_TIPO, args);
    }

    validaTamanho(value: string, schema: IConstraintSchema, args: ValidationArguments) {

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

    validaValorPadrao(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        if (schema.default && !(<Array<any>>schema.default)?.includes(value))
            this.message(MSG.ERR_FIELD_VALOR, args);
    }

    validaExpressaoRegular(value: string, schema: IConstraintSchema, args: ValidationArguments) {
        const rgx = <RegExp><unknown>schema.regex;
        if (rgx && !rgx.test(value)) {
            (<IConstraintSchema>args.constraints[0]).regex = `/${rgx.source}/${rgx.flags}`;
            this.message(MSG.ERR_FIELD_VALOR, args);
        }
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