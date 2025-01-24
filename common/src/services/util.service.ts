import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { jwtDecode } from "jwt-decode";

@Injectable()
export class UtilService implements IUtilService {
    private static jwtService = new JwtService();
    private static instance: UtilService;

    private constructor() {
        if (UtilService.instance) {
            return UtilService.instance;
        }
        UtilService.instance = this;
    }

    static getInstance(): UtilService {
        return new UtilService();
    }

    static async tokenGenerate(loginData: unknown, options?: JwtSignOptions): Promise<string> {
        const payload = { loginData };
        const token = UtilService.jwtService.sign(payload, options);
        return token;
    }

    static async tokenVerify(token: string, options?: JwtVerifyOptions): Promise<string> {
        const result = await UtilService.jwtService.verifyAsync(token, options);
        return result;
    }

    /**
     * Decodes a JWT token without verifying the signature.
     *
     * @param token The JWT token to decode.
     * @returns The decoded token as a JSON object.
     */
    tokenDecodeWithoutVerify(token: string): unknown {
        const result = jwtDecode(token);
        return result;
    }

    /**
     * Encrypts a text using the bcrypt hashing algorithm.
     * @param text The text to encrypt.
     * @returns A promise that resolves with an object containing the encrypted hash.
     */
    async hashEncrypt(text: string): Promise<{ hash: string; }> {
        const saltOrRounds = 10;
        const hashGenerate = await hash(text, saltOrRounds);
        return { hash: hashGenerate };
    }

/**
 * Compares a plain text with a hashed value to determine if they match.
 * 
 * @param text The plain text input to compare.
 * @param hash The hashed value to compare against.
 * @returns A promise that resolves to true if the text matches the hash, false otherwise.
 */
    async hashCompare(text: string, hash: string): Promise<boolean> {
        const isMatch = await compare(text, hash);
        return isMatch;
    }

}

export interface IUtilService {
    // tokenGenerate(loginData: unknown, options?: { expiresIn?: string; }): Promise<string>;
    // tokenDecodeWithoutVerify(token: string): unknown;
    hashEncrypt(pass: string): Promise<{ hash: string; }>;
    hashCompare(password: string, hash: string): Promise<boolean>;
}