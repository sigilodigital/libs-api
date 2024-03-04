import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationArguments } from 'class-validator';
import { IMessage } from '../services/api-messages';
import { ApiResponse } from '../services/api-response-static';

export class MessageValidate {

    static exec(objMessage: IMessage, args: ValidationArguments, context?: { className?: string, methodName?: string; }) {
        const objError = ApiResponse.handler({
            objMessage: objMessage,
            property: args.property,
            valueArg: args.value,
            error: {
                message: `Validação do objeto ${args.targetName} :: propriedade: ${args.property}, valor: ${args.value}, tipo: ${typeof args.value}`,
                context: {
                    className: context?.className,
                    methodName: context?.methodName,
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


