import { Between, Equal, FindOptionsWhere, Like } from 'typeorm';
import { IAuditoriaConsultarDto } from '../models/dto/audit-consultar.dto';
import { IUtilRepository } from '@libs/common/repository/util.repository';
import { AuditEntity } from '../models/entities/audit.entity';


export class AuditoriaConsultarUseCase {

    constructor(private repository: IUtilRepository) { }

    public async handle(input: IAuditoriaConsultarDto['input']) {
        await this.repository.init([AuditEntity]);

        let where: FindOptionsWhere<AuditEntity>;

        if (input.dtInicial && input.dtFinal)
            where.dtAcao = Between(input.dtInicial, input.dtFinal);

        if (input.usuarioId)
            where.usuarioId = Equal(input.usuarioId);

        if (input.operacaoTipo)
            where.txtAlteracao = Like(input.operacaoTipo);

        return await this.repository.findBy(where, AuditEntity);
    }

}