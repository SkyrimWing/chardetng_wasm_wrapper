/**
 * Wrapper for chardetng
 */
export default class CharsetDetector {
	static assemblyPath: string;
	static assembly: Response;
	static chardetNGModule: WebAssembly.Module;
	static defaultInstance: WebAssembly.Instance;
	static defaultDetector: CharsetDetector;
	static getDefaultDetector(): CharsetDetector;
	static instantiateModule(): Promise<WebAssembly.Instance>;
	static create(): Promise<CharsetDetector>;
	private chardetNG;
	private detectInterface;
	private memoryCache;
	constructor(chardetNGInstance: WebAssembly.Instance);
	detect(stringUint8Array: Uint8Array): string;
	private static charsetInnerMap;
}
