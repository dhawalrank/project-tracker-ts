import { logger } from "../components/logger";

export function throwError(
	target: any,
	_2: string,
	descriptor: PropertyDescriptor
) {
	const method = descriptor.value as Function;
	descriptor.value = function (...args: any) {
		try {
			return method.call(this, target, args);
		} catch (error) {
			if (error instanceof Error)
				logger.error(error.message, {
					stack: error.stack,
					name: error.name,
				});
			else if (typeof error === "string") {
				logger.error(error);
			}
		}
	};
}
