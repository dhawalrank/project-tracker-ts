import { Listener } from "../types/listener";

export class State<T> {
	protected listeners: Listener<T>[] = [];
	protected state: {
		[key: string]: T[];
	} = {};
	constructor(key: string) {
		this.state[key] = [];
	}
	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}
