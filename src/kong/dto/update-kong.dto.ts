import { PartialType } from '@nestjs/mapped-types';
import { CreateKongDto } from './create-kong.dto';

export class UpdateKongDto extends PartialType(CreateKongDto) {
  id: number;
}
