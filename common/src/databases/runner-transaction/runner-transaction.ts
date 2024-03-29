import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { QueryRunner } from "typeorm";

import { AppDataSourceAsync } from "@libs/common/databases";
import { AuditLogSubscriber } from "@sd-root/libs/audit/src/subscriber/audit.subscriber";
import { DbConfigOptionsType, DbOptionType } from "../db-pg-piloto.config";

export class RunnerTransaction {

    static subscriberList: (string | Function)[] = [AuditLogSubscriber];

    private static async createQueryRunner(dbConfigOption?: DbConfigOptionsType): Promise<QueryRunner> {
        const queryRunner = (await AppDataSourceAsync.init(dbConfigOption)).createQueryRunner();
        return queryRunner;
        // return AppDataSource.createQueryRunner();
    }

    public static async startTransaction(entityList: EntityClassOrSchema[], dbOption?: DbOptionType): Promise<QueryRunner> {

        const dbConfigOptions: DbConfigOptionsType = {
            dbOption: dbOption,
            subscriberList: this.subscriberList,
            entityList: entityList
        };

        const queryRunner = await RunnerTransaction.createQueryRunner(dbConfigOptions);
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }

    public static async commitTransaction(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.commitTransaction();
    }

    public static async rollbackTransaction(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.rollbackTransaction();
    }
    public static async finalizeTransaction(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.release();
        await AppDataSourceAsync.close(queryRunner.connection);
    }
}