import { env } from "./envSchema";

export default () => ({
    auth: {
        secretKey: env.AUTH_SECRET_KEY,
        expiresIn: {
            bearer: env.AUTH_EXP_BEARER,
            replace: env.AUTH_EXP_REPLACE
        }
    },
    server: {
        port: env.SRV_PORT,
        filePath: env.SRV_FILE_PATH,
    },
    apis: {
        apiConfigGerais: env.API_CONFIG_GERAIS,
        apiDadosGerais: env.API_DADOS_GERAIS,
        apiGestaoAcesso: env.API_GESTAO_ACESSO
    },
    environment: {
        isDebugMode: JSON.parse(env.SRV_DEBUG_MODE),
        appEnv: env.APP_ENV,
    },
    db: {
        host: env.DB_HOST,
        port: parseInt(env.DB_PORT),
        database: env.DB_NAME,
        schema: env.DB_SCHEMA,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
    }
});  