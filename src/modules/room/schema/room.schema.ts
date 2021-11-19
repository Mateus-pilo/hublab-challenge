import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ strict: false, versionKey: false })
export class Room {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId })
  userCreatedId: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
