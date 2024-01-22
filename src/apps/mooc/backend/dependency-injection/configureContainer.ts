import * as awilix from 'awilix';

import { MongoEnvironmentArranger } from '../../../../../tests/Contexts/Shared/infrastructure/mongo/MongoEnvironmentArranger';
import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';
import { MongoCourseRepository } from '../../../../Contexts/Mooc/Courses/infrastructure/persistance/MongoCourseRepository';
import { MongoConfigFactory } from '../../../../Contexts/Mooc/Shared/infrastructure/persistance/mongo/MongoConfigFactory';
import { MongoClientFactory } from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoClientFactory';
import MongoConfig from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoConfig';
import { CoursePutController } from '../controllers/CoursePutController';
import StatusGetController from '../controllers/StatusGetController';
import { LoginPostController } from '../controllers/LoginPostController';
import { SignupPostController } from '../controllers/SignupPostController';

const container = awilix.createContainer({
	injectionMode: awilix.InjectionMode.PROXY,
	strict: true
});

container.register({
	mongoConfig: awilix.asFunction(() => MongoConfigFactory.createConfig()).singleton(),
	connectionManager: awilix
		.asFunction(({ mongoConfig }: { mongoConfig: MongoConfig }) =>
			MongoClientFactory.createClient('mooc', mongoConfig)
		)
		.singleton(),
	courseRepository: awilix.asClass(MongoCourseRepository).singleton(),
	courseCreator: awilix.asClass(CourseCreator).singleton(),
	coursePutController: awilix.asClass(CoursePutController).singleton(),
  loginPostController: awilix.asClass(LoginPostController).singleton(),
  signupPostController: awilix.asClass(SignupPostController).singleton(),
	statusGetController: awilix.asClass(StatusGetController).singleton(),
	environmentArranger: awilix.asClass(MongoEnvironmentArranger).singleton()
});

export default container;
