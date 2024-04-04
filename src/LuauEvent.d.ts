export declare type CustomParameters<T> = Parameters<
	T extends unknown[] ? (...args: T) => never : T extends unknown ? (arg: T) => never : () => never
>;

export declare type SignalCallback<T> = (...args: CustomParameters<T>) => unknown;
export declare type SignalWait<T> = T extends unknown[] ? LuaTuple<T> : T;

export declare namespace Event {
	interface Constructor {
		new <T>(): Event<T>;
		readonly wrap: <T extends Callback>(signal: RBXScriptSignal<T>) => Event<T>;
	}
}

export declare interface Event<T> {
	readonly Event: Signal<T>;
	readonly RBXScriptConnection?: RBXScriptConnection;

	Fire(...args: CustomParameters<T>): void;
	DisconnectAll(): void;
	Destroy(): void;
}

export declare interface Signal<T> {
	Connect(fn: SignalCallback<T>): Connection<T>;
	Once(fn: SignalCallback<T>): Connection<T>;
	Wait(): SignalWait<T>;
}

export declare interface Connection<T> {
	readonly Connected: boolean;
	Disconnect(): void;
	Reconnect(): void;
}
