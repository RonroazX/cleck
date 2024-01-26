import { MotherCreator } from './MotherCreator';

export class WordMother {
	static random(minLength: number): string {
		return MotherCreator.word(minLength) || 'word';
	}
}
