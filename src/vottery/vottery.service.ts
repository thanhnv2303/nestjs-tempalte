import {Injectable} from '@nestjs/common';
import {UpdateVotteryDto} from './dto/update-vottery.dto';

@Injectable()
export class VotteryService {

    findAll() {
        return `This action returns all vottery`;
    }

    findOne() {
        return
    }

    updateConfig() {
        return
    }

    remove(id: string) {
        return `This action removes a #${id} vottery`;
    }

    drawFinalNumber() {
        return
    }

    addFund() {
        return
    }

    recoverFund() {
        return
    }
}
