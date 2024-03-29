import { Injectable, HttpException } from '@nestjs/common';
import { ApiResponse, IApiResponseMessage } from '@libs/common/services/api-response';
import { IMessage } from '@libs/common/services/api-messages';

export interface IExceptionHttpService {
    input: { httpStatusCode: number, errMessage: string; } & IApiResponseMessage<any, any>,
    output: {
        message: string;
    };
}
@Injectable()
export class ExceptionHttpService {

    static createException(input: IExceptionHttpService['input']) {
        const apiResponse = new ApiResponse();

        throw new HttpException(apiResponse.handler({
            objMessage: input.objMessage,
            property: input.property,
            valueArg: input.valueArg,
            error: {
                message: input.errMessage,
                context: {
                    className: "ExceptionHttpService",
                    methodName: "createException",
                    input: input.input,
                    output: input.output
                }
            }
        }), input.httpStatusCode);
    }
}
