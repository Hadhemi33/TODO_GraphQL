import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  desc: string;
  @Field({ nullable: true })
  checked: boolean;
}
@InputType()
export class UpdateTaskInput {
  @Field()
  desc: string;
  @Field(() => Boolean)
  checked: boolean;
}
