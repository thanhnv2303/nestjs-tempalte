import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';


export type VotteryPoolDocument = HydratedDocument<VotteryPool>

@Schema()
export class VotteryPool {
    // @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
    // _id: string;

    @Prop({ required: true, type: String })
    address: string;

    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    validator: string;

    @Prop({ required: true, type: String })
    network: string;

    @Prop({ required: true, type: String })
    rngNetwork: string;

    @Prop({ required: true, type: String })
    rngContractAddress: string;

    @Prop({ required: true, type: Number })
    totalVottery: number;

    @Prop({ required: false, type: String })
    totalDeposit?: string;

    @Prop({ required: false, type: String })
    config?: any;

    @Prop({ required: true, type: Boolean })
    automation: boolean;

    @Prop(raw({
        createVotteryExpression: { type: String },
        addFundVotteryExpression: { type: String },
        votteryDuration: { type: String },
        claimPeriod: { type: String }
    }))
    scheduler?: object;
}

export const VotteryPoolSchema = SchemaFactory.createForClass(VotteryPool)