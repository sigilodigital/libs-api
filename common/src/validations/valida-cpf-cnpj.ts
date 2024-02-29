import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ApiResponse } from '../services/api-response-static';
import { IMessage, MSG } from '../services/api-messages';
import { validaCNPJ, validaCPF } from '../utils';

@ValidatorConstraint({ name: 'ValidaCpfCnpj', async: true })
export class ValidaCpfCnpj implements ValidatorConstraintInterface {
    LOG_CLASS_NAME = "ValidaCpfCnpj";

    async validate(value: string, args: ValidationArguments) {
        return this.validaCpfCnpj(value, args);
    }

    async validaCpfCnpj(value: string, args: ValidationArguments) {

        value = value.toString().replace(/[^0-9]/g, '');

        switch (value.length) {
            case 11: if (validaCPF(value)) return true;
            case 14: if (validaCNPJ(value)) return true;
            default: this.message(MSG.ERR_FIELD_INVA, args);
        }

    }

    message(objMessage: IMessage, args: ValidationArguments) {
        const objError = ApiResponse.handler({
            objMessage: objMessage,
            property: args.property,
            valueArg: args.value,
            error: {
                message: `Validação do objeto ${args.targetName} :: `
                    + `propriedade: ${args.property}, `
                    + `valor: ${args.value}, `
                    + `tipo: ${typeof args.value}`,
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