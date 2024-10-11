import { Test, TestingModule } from '@nestjs/testing';

import { QUERY_RUNNER_PROVIDER } from '@sd-root/libs/common/src/providers/query-runner.provider';
import { UtilRepository } from '../repository/util.repository';
import { UserEntity } from '@sd-root/src/core/resources/user/models/entities/user.entity';
import { LoginUserInputDto } from '@sd-root/src/core/resources/auth/models/dto/login-user.dto';
import { UserFindInputDto, UserFindOutputDto } from '@sd-root/src/core/resources/user/models/dto/user-find.dto';
import { EmailEntity } from '@sd-root/src/core/resources/contact/models/entities/email.entity';

const entities = UserEntity.getEntityList([]);

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

    jest.setTimeout(120000);

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
    //     const input: UserFindInputDto = { isActive: true };
    //     try {
    //         const result = await utilRepository.find(input, UserEntity);

    //         expect(result).toBeInstanceOf(Array<UserFindOutputDto>);
    //         expect(result.length).toBeGreaterThanOrEqual(2);
    //     } catch (error) {
    //         await SDExpectJest.fnNotCatchError(error, expect);
    //     }
    // });

    it('find: deve retornar uma lista de usuários', async () => {
        const input: LoginUserInputDto = { username: 'sd', password: '123' };
        const result = await utilRepository.find({ where: { isActive: true } }, UserEntity);

        expect(result).toBeInstanceOf(Array<UserFindOutputDto>);
    });

    it('find: deve retornar todos os usuários, inclusive os dados das tabelas relacionadas', async () => {
        const input: UserFindInputDto = {};
        const result = await utilRepository.find({
            where: input,
            // relations: {
            //     _loginInfo: true
            // }
        }, UserEntity);

        expect(result).toBeInstanceOf(Array<UserFindOutputDto>);
        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result[0]).toMatchObject({
            'id': expect.any(String),
            // '_dataAccess': expect.any(DataAccessEntity),
            // '_contact': { '_emailList': expect.any(Array<EmailEntity>) },
            // '_profileList': expect.any(Array<ProfileEntity>),
        });
    });

    it('findOne: deve retornar apenas um usuário e seus relacionamentos', async () => {
        const input: UserFindInputDto = { username: 'abcd' };
        const result = await utilRepository.findOne({
            where: input, 
            // relations: {
            //     // _contact: true,
            //     // _dataAccess: true,
            //     _loginInfo: true
            // }
        }, UserEntity);

        expect(result).toBeInstanceOf(UserEntity);
        expect(result).toMatchObject({
            'id': expect.any(String),
            // '_dataAccess': expect.any(DataAccessEntity),
            // '_contact': { '_emailList': expect.any(Array<EmailEntity>) },
            // '_profileList': expect.any(Array<ProfileEntity>),
        });
    });
});
