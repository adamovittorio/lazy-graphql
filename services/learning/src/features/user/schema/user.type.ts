import { ObjectType, Field, ID, Directive } from "type-graphql";

@ObjectType()
@Directive("@extends")
@Directive(`@key(fields: "id")`)
export default class User {
  @Field(() => ID)
  @Directive(`@external`)
  id: string;
}
