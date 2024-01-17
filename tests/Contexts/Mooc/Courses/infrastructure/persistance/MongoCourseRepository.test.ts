import container from '../../../../../../src/apps/mooc/backend/dependency-injection/configureContainer';
import { CourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { CourseMother } from '../../domain/CourseMother';

const repository: CourseRepository = container.resolve<CourseRepository>('courseRepository');
const environmentArranger: Promise<EnvironmentArranger> =
	container.resolve<Promise<EnvironmentArranger>>('environmentArranger');

beforeEach(async () => {
	await (await environmentArranger).arrange();
});

afterAll(async () => {
	await (await environmentArranger).close();
});

describe('CourseRepository', () => {
	describe('#save', () => {
		it('should save a course', async () => {
			const course = CourseMother.random();

			await repository.save(course);
		});
	});
});
