import * as awilix from 'awilix';
import { MongoEnvironmentArranger } from '../../../../../tests/Contexts/Shared/infrastructure/mongo/MongoEnvironmentArranger';
import { UserCreator } from '../../../../Contexts/AccessManagement/Users/application/UserCreator';
import { MongoUserRepository } from '../../../../Contexts/AccessManagement/Users/infrastructure/MongoUserRepository';
import { MongoConfigFactory } from '../../../../Contexts/AccessManagement/Shared/infrastructure/persistance/mongo/MongoConfigFactory';
import { MongoClientFactory } from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoClientFactory';
import MongoConfig from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoConfig';
import { LoginPostController } from '../controllers/LoginPostController';
import { SignupPostController } from '../controllers/SignupPostController';
import StatusGetController from '../controllers/StatusGetController';

const container = awilix.createContainer({
	injectionMode: awilix.InjectionMode.PROXY,
	strict: true
});

container.register({
	mongoConfig: awilix.asFunction(() => MongoConfigFactory.createConfig()).singleton(),
	connectionManager: awilix
		.asFunction(({ mongoConfig }: { mongoConfig: MongoConfig }) =>
			MongoClientFactory.createClient('accessmanagement', mongoConfig)
		)
		.singleton(),
	userRepository: awilix.asClass(MongoUserRepository).singleton(),
	userCreator: awilix.asClass(UserCreator).singleton(),
	loginPostController: awilix.asClass(LoginPostController).singleton(),
	signupPostController: awilix.asClass(SignupPostController).singleton(),
	statusGetController: awilix.asClass(StatusGetController).singleton(),
	environmentArranger: awilix.asClass(MongoEnvironmentArranger).singleton()
});

export default container;
