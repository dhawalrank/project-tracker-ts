interface ThirdPartyLoggerProps {
	info: (message: string, extra?: object) => void;
	debug: (message: string, extra?: object) => void;
	warn: (message: string, extra?: object) => void;
	error: (message: string, extra?: object) => void;
}

class ThirdPartyLogger implements ThirdPartyLoggerProps {
	constructor() {}
	info(message: string, extra?: object) {
		console.info(message, extra);
	}
	debug(message: string, extra?: object) {
		console.debug(message, extra);
	}
	warn(message: string, extra?: object) {
		console.warn(message, extra);
	}
	error(message: string, extra?: object) {
		console.error(message, extra);
	}
}

class Logger {
	private static logger: ThirdPartyLoggerProps;
	private constructor() {}
	static getLogger() {
		if (!this.logger) {
			this.logger = new ThirdPartyLogger();
			return this.logger;
		}
		return this.logger;
	}
}

export const logger = Logger.getLogger();
