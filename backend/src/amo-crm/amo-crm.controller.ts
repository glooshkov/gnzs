import { Controller, Post, Body } from '@nestjs/common';
import { AmoCrmService } from './amo-crm.service';

@Controller('amo-crm')
export class AmoCrmController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @Post('create-entity')
  async createEntity(
    @Body('entityType') entityType: string,
    @Body('data') data: any,
  ) {
    const result = await this.amoCrmService.createEntity(entityType, data);
    return { id: result._embedded[entityType][0].id };
  }
}