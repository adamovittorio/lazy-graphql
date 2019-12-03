import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class Player {
  @Field(_type => ID)
  id: string;

  @Field()
  username: string;
}
