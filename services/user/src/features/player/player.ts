import { ObjectType, Field, ID, Directive } from "type-graphql";

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Player {
  @Field(_type => ID)
  id: string;

  @Field()
  username: string;
}
