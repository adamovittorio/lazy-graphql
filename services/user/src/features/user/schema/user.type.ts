import { ObjectType, Field, ID, Directive } from "type-graphql";

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User {
  @Field(_type => ID)
  id: string;

  @Field()
  username: string;
}
