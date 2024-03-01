import { Test, TestingModule } from '@nestjs/testing';

import { SDExpectJest } from '@libs/common/tests/expects-jest';
import { LoginUserInputDto } from 'src/core/auth/models/dto/login-user.dto';
import { EmailEntity } from '../../../../libs/common/src/models/entities/contato/email.entity';
import { QUERY_RUNNER_PROVIDER } from '@sd-root/libs/common/src/providers/query-runner.provider';
import { UtilRepository } from '..';
import { UsuarioConsultarInputDto, UsuarioConsultarOutputDto } from '@sd-root/src/features/usuario/models/dto/usuario-consultar.dto';
import { UsuarioEntity } from '@sd-root/src/features/usuario/models/entities/usuario.entity';
import { DataAccessEntity } from '@sd-root/src/features/usuario/models/entities/data-access.entity';
import { TelefoneEntity } from '../models/entities/contato/telefone.entity';
import { LoginInfoEntity } from '@sd-root/src/features/usuario/models/entities/login-info.entity';
import { EnderecoEntity } from '../models/entities/contato/endereco.entity';
import { ContatoEntity } from '../models/entities/contato/contato.entity';
import { ProfileEntity } from '@sd-root/src/features/usuario/models/entities/profile.entity';

const entities = [
    UsuarioEntity, ContatoEntity, EmailEntity, TelefoneEntity, EnderecoEntity,
    ProfileEntity, LoginInfoEntity, DataAccessEntity
];
describe('UtilRepository', () => {
    let repo: UtilRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UtilRepository,
                QUERY_RUNNER_PROVIDER,
                // { provide: UtilRepository, useFactory(...args) { return new UtilRepository(); }, }
            ],
        }).compile();

        // repo = module.get<UtilRepository>(UtilRepository);
        repo = new UtilRepository();
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });
});

describe('UtilRepository: Testando conexão com DB', () => {
    let repo: UtilRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: UtilRepository, useFactory(...args) {
                    return new UtilRepository(entities);
                },
            }],
        }).compile();

        repo = module.get<UtilRepository>(UtilRepository);
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });

});

describe('UtilRepository: testando os métodos do repository', () => {
    let utilRepository: UtilRepository;

    jest.setTimeout(120000)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: UtilRepository, useFactory(...args) {
                    return new UtilRepository(entities);
                },
            }],
        }).compile();
        

        utilRepository = module.get<UtilRepository>(UtilRepository);
    });

    // it('getUserList: deve retornar uma lista de usuários ativos', async () => {
    //     const input: UsuarioConsultarInputDto = { isActive: true };
    //     try {
    //         const result = await utilRepository.find(input, UsuarioEntity);

    //         expect(result).toBeInstanceOf(Array<UsuarioConsultarOutputDto>);
    //         expect(result.length).toBeGreaterThanOrEqual(2);
    //     } catch (error) {
    //         await SDExpectJest.fnNotCatchError(error, expect);
    //     }
    // });

    it('find: deve retornar uma lista de usuários', async () => {
        const input: LoginUserInputDto = { username: 'sd', password: '123' };
        const result = await utilRepository.find({ where: { isActive: true } }, UsuarioEntity);

        expect(result).toBeInstanceOf(Array<UsuarioConsultarOutputDto>);
    });

    it('find: deve retornar todos os usuários, inclusive os dados das tabelas relacionadas', async () => {
        const input: UsuarioConsultarInputDto = {};
        const result = await utilRepository.find({
            where: input, relations: {
                _contato: true,
                _dataAccess: true,
                _loginInfo: true
            }
        }, UsuarioEntity);

        expect(result).toBeInstanceOf(Array<UsuarioConsultarOutputDto>);
        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result[0]).toMatchObject({
            'id': expect.any(String),
            // '_dataAccess': expect.any(DataAccessEntity),
            '_contato': { '_emailList': expect.any(Array<EmailEntity>) },
            // '_profileList': expect.any(Array<ProfileEntity>),
        });
    });

    it('findOne: deve retornar apenas um usuário e seus relacionamentos', async () => {
        const input: UsuarioConsultarInputDto = { _dataAccess: { username: 'abcd' } };
        const result = await utilRepository.findOne({
            where: input, relations: {
                _contato: true,
                _dataAccess: true,
                _loginInfo: true
            }
        }, UsuarioEntity);

        expect(result).toBeInstanceOf(UsuarioEntity);
        expect(result).toMatchObject({
            'id': expect.any(String),
            '_dataAccess': expect.any(DataAccessEntity),
            '_contato': { '_emailList': expect.any(Array<EmailEntity>) },
            // '_profileList': expect.any(Array<ProfileEntity>),
        });
    });
});
