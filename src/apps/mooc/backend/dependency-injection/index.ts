import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import path from 'path';

const getContainer = async (): Promise<ContainerBuilder> => {
	const container = new ContainerBuilder(true, path.join(__dirname));
	const loader = new YamlFileLoader(container);
	const env = process.env.NODE_ENV ?? 'dev';

	await loader.load(path.resolve(`${__dirname}/application_${env}.yaml`));

	return container;
};

export default getContainer;
