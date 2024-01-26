import { MotherCreator } from "./MotherCreator";

export class PasswordMother {
  static random(length: number) {
    return MotherCreator.password(length);
  }
}
