import { BadRequestException, HttpException } from "@nestjs/common";
import * as playwright from '@playwright/test';

import { MSG } from "../services/api-messages";

export class SDExpectPlaywright {
    
    static async fnDtoAndLog(res: playwright.Response) {
        const body = await res.json();
        const status = res.status();
        const statusText = res.statusText();
        const headers = res.headers();

        console.log('Body', body);
        console.log('Status', status, statusText);
        console.log('Headers', headers);

        return { body, status, headers };
    }
    static async fnNotCatchError(error: any, expect: playwright.Expect | jest.Expect) {
        expect(error).not.toBeInstanceOf(Error);
        expect(error).not.toBeInstanceOf(HttpException);
    }

    static async fnCatchErrorDefault(error: any, expect: playwright.Expect | jest.Expect) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toBeInstanceOf(BadRequestException);
    }

    static async fnCatchErrorForRequired(error: any, expect: playwright.Expect | jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_NULL.code);
    }

    static async fnCatchErrorForSize(error: any, expect: playwright.Expect | jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_LENGTH.code);
    }

    static async fnCatchErrorForType(error: any, expect: playwright.Expect | jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_TYPE.code);
    }

    static async fnCatchErrorForValue(error: any, expect: playwright.Expect | jest.Expect) {
        expect(error.response).toHaveProperty('status.statusCode', MSG.ERR_FIELD_VALUE.code);
    }

};