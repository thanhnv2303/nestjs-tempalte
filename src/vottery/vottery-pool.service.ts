import {Injectable} from '@nestjs/common';
import {CreateVotteryDto} from './dto/create-vottery.dto';
import {UpdateVotteryDto} from './dto/update-vottery.dto';

@Injectable()
export class VotteryPoolService {
    create() {
        return 'This action adds a new vottery';
    }

    findAll() {
        return `This action returns all vottery`;
    }

    findOne(id: string) {
        return `This action returns a #${id} vottery`;
    }

    update(id: string, updateVotteryDto: UpdateVotteryDto) {
        return `This action updates a #${id} vottery`;
    }

    remove(id: string) {
        return `This action removes a #${id} vottery`;
    }

    createVottery() {
        return
    }

    withdrawVotteryPoolFund() {
        return
    }

    depositVotteryPoolFund() {
        return
    }


}
