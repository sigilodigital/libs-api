import { Module } from '@nestjs/common';
import { AuditoriaService } from './audit.service';
import { AuditEventListDto } from './models/dto/audit-event-list.dto';



@Module({
    providers: [AuditoriaService, AuditEventListDto],
    exports: [AuditoriaService]
})
export class AuditoriaModule { }
