import { ApiResponse, IApiResponseMessage } from '@libs/common/services/api-response';
import { HttpException, Injectable } from '@nestjs/common';

export interface IHttpExceptionService extends IApiResponseMessage<any, any> { 
    httpStatusCode: number, 
    errMessage: string; 
}

@Injectable()
export class HttpExceptionService {

    static createException(input: IHttpExceptionService['input']) {
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
