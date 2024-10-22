import { DataSource } from "typeorm";
import { DbConfigOptionsType, dbConfig } from "./db-facilitary-pg.config";


export class AppDataSourceAsync {

    static async init(dbConfigOptions: DbConfigOptionsType): Promise<DataSource> {

        // dbConfigOptions.dbOption = (dbConfigOptions.dbOption) ? dbConfigOptions.dbOption : 'pg_piloto_default';
        const dataSource = new DataSource(dbConfig(dbConfigOptions));

        try {
            await dataSource.initialize();
            console.info("Datasource: ", dataSource);
        } catch (error) {
            console.error("Error during Data Source initialization", error);
        }
        // .then(() => {
        //     console.info("Data Source has been initialized! " + dbConfigOptions.entityList.length);
        // })
        // .catch((err) => {
        //     console.error("Error during Data Source initialization", err);
        // })

        return dataSource;
    }

    static async close(dataSource: DataSource): Promise<void> {
        await dataSource.destroy();
    }
}