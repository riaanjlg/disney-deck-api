import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ collection: 'characters', versionKey: false, timestamps: true })
export class Character {
  readonly _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  externalId: number;

  @Prop({ required: true, maxLength: 100, trim: true })
  name: string;

  @Prop({ required: true, maxLength: 100, trim: true })
  imageUrl: string;

  @Prop({ type: [String], default: [] })
  films: string[];

  @Prop({ type: [String], default: [] })
  shortFilms: string[];

  @Prop({ type: [String], default: [] })
  tvShows: string[];

  @Prop({ type: [String], default: [] })
  videoGames: string[];

  @Prop({ type: [String], default: [] })
  enemies: string[];

  @Prop({ type: [String], default: [] })
  allies: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
