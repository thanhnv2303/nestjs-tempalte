import { PartialType } from '@nestjs/mapped-types';
import { CreateVotteryDto } from './create-vottery.dto';

export class UpdateVotteryDto extends PartialType(CreateVotteryDto) {}
