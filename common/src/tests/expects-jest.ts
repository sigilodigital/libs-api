import { BadRequestException, HttpException } from "@nestjs/common";

import { MSG } from "../services/api-messages";

export class SDExpectJest {
    static async fnNotCatchError(error: any, expect: jest.Expect) {
        expect(error).not.toBeInstanceOf(Error);
        expect(error).not.toBeInstanceOf(HttpException);
    }

    static async fnCatchErrorDefault(error: any, expect: jest.Expect) {
        expect(error).toBeInstanceOf(Error);
        // expect(error).toBeInstanceOf(HttpException);
        // expect(error).toBeInstanceOf(BadRequestException);
    }

    static async fnCatchErrorForRequired(error: any, expect: jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_NULL.code);
    }

    static async fnCatchErrorForSize(error: any, expect: jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_LENGTH.code);
    }

    static async fnCatchErrorForType(error: any, expect: jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_TYPE.code);
    }

    static async fnCatchErrorForValue(error: any, expect: jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_VALUE.code);
    }

};