import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {VotteryService} from './vottery.service';
import {CreateVotteryDto} from './dto/create-vottery.dto';
import {UpdateVotteryDto} from './dto/update-vottery.dto';

@Controller('vottery')
export class VotteryController {
    constructor(private readonly votteryService: VotteryService) {
    }

    @Post()
    create(@Body() createVotteryDto: CreateVotteryDto) {
        return
    }

    @Get()
    findAll() {
        return this.votteryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.votteryService.findOne();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVotteryDto: UpdateVotteryDto) {
        return
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return
    }
}
