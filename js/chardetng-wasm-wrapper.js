/**
 * Wrapper for chardetng.
 */
export default class CharsetDetector {
	
	static assemblyPath = "./chardetng-wrapper.wasm";
	static assembly;
	static chardetNGModule;
	static defaultInstance;
	static defaultDetector;
	
	static getDefaultDetector() {
		return CharsetDetector.defaultDetector;
	}
	
	static instantiateModule() {
		return WebAssembly.instantiate(CharsetDetector.chardetNGModule);
	}
	
	static async create() {
		const moduleInstance = await CharsetDetector.instantiateModule();
		return new CharsetDetector(moduleInstance);
	}
	
	chardetNG;
	detectInterface;
	memoryCache;
	
	constructor(chardetNGInstance) {
		this.chardetNG = chardetNGInstance;
		this.detectInterface = chardetNGInstance.exports;
		this.memoryCache = new Uint8Array(chardetNGInstance.exports.memory.buffer);
		
		this.detect = this.detect.bind(this);
	}
	
	
	detect(stringUint8Array) {
		const bufferLength = stringUint8Array.length;
		
		const bufferPointer = this.detectInterface.__wbindgen_malloc(bufferLength);
		if (this.memoryCache.buffer !== this.detectInterface.memory.buffer) {
			this.memoryCache = new Uint8Array(this.detectInterface.memory.buffer);
		}
		this.memoryCache.set(stringUint8Array, bufferPointer);
		
		const code = this.detectInterface.detect(bufferPointer, bufferLength);
		const encoding = CharsetDetector.charsetInnerMap.get(code);
		
		return encoding ?? "replacement";
	}
	
	static charsetInnerMap = new Map([
		[12, "UTF-8"],
		[54, "GB18030"],		[10, "GBK"],			[11, "Big5"],
		[45, "EUC-KR"],			[14, "Shift_JIS"],		[22, "windows-1250"],
		[23, "windows-1251"],	[0, "windows-1252"],	[28, "windows-1253"],
		[4, "windows-1254"],	[32, "windows-1255"],	[36, "windows-1256"],
		[39, "windows-1257"],	[40, "windows-1258"],	[53, "windows-874"],
		[1, "ISO-8859-2"],		[21, "ISO-8859-7"],		[46, "EUC-JP"],
		[176, "ISO-2022-JP"],	[51, "KOI8-U"],			[77, "ISO-8859-5"], 
		[7, "IBM866"],			[9, "KOI8-R"],			[60, "ISO-8859-8-I"], 
		[3, "ISO-8859-4"],		[43, "ISO-8859-6"],		[44, "ISO-8859-8"], 
		[101, "ISO-8859-13"],	[2, "ISO-8859-3"],		[5, "ISO-8859-10"], 
		[103, "ISO-8859-14"],	[6, "ISO-8859-15"],		[164, "ISO-8859-16"],
		[-1, "replacement"]
	]);
	
}

const chardetNGAssembly = await fetch(CharsetDetector.assemblyPath);
const instantiatedSource = await WebAssembly.instantiateStreaming(chardetNGAssembly);

CharsetDetector.assembly = chardetNGAssembly;
CharsetDetector.chardetNGModule = instantiatedSource.module;
CharsetDetector.defaultInstance = instantiatedSource.instance;
CharsetDetector.defaultDetector = new CharsetDetector(instantiatedSource.instance);
