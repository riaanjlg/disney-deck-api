import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ collection: 'characters', versionKey: false, timestamps: true })
export class Character {
  readonly _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  externalId: number;

  @Prop({ required: true, maxLength: 100, trim: true, index: true })
  name: string;

  @Prop({ required: true, maxLength: 100, trim: true })
  imageUrl: string;

  @Prop({ type: [String], default: [], index: true })
  films: string[];

  @Prop({ type: [String], default: [], index: true })
  shortFilms: string[];

  @Prop({ type: [String], default: [], index: true })
  tvShows: string[];

  @Prop({ type: [String], default: [], index: true })
  videoGames: string[];

  @Prop({ type: [String], default: [], index: true })
  enemies: string[];

  @Prop({ type: [String], default: [], index: true })
  allies: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
