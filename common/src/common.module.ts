import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { UtilService } from './services/util.service';
import { ApiResponse } from './services/api-response';
import { QUERY_RUNNER_PROVIDER } from './providers/query-runner.provider';

import { UtilRepository } from './repository/util.repository';
// import { UtilRepository } from '.';

@Module({
    imports: [],
    providers: [
        CommonService,
        UtilService,
        
        UtilRepository,

        ApiResponse,
        QUERY_RUNNER_PROVIDER
    ],
    exports: [
        CommonService,
        UtilService,
        
        UtilRepository,
        
        ApiResponse,
        QUERY_RUNNER_PROVIDER
    ],
})
export class CommonModule { }
