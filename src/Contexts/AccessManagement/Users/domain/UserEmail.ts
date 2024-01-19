import { StringValueObject } from "../../../Shared/domain/value-object/StringValueObject";

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
