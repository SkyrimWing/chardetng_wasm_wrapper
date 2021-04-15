# chardetng wasm wrapper

[![Apache 2 / MIT dual-licensed](https://img.shields.io/badge/license-Apache%202%20%2F%20MIT-blue.svg)](https://github.com/hsivonen/chardetng/blob/master/COPYRIGHT)

A WebAssembly wrapper for [chardetng](https://github.com/hsivonen/chardetng) using [wasm-pack-template](https://github.com/rustwasm/wasm-pack-template).

## Example
1:
```
import CharsetDetector from "./chardetng-wasm-wrapper.js";

const textEncoder = new TextEncoder();
const testData = textEncoder.encode("Hello, Cosmos!");

const detector = CharsetDetector.getDefaultDetector();
const encoding1 = detector.detect(testData);
console.log(encoding1);			//UTF-8
```
2:
```
import CharsetDetector from "./chardetng-wasm-wrapper.js";

const detector = CharsetDetector.getDefaultDetector();

const fileInput = document.getElementById("file_input");
fileInput.addEventListener(
	"input",
	async (event) => {
		const inputFileList = event.target.files;
		for(let file of inputFileList) {
			let fileBuffer = await file.arrayBuffer();
			let fileData = new Uint8Array(fileBuffer);
			let fileEncoding = detector.detect(fileData);
			let fileName = file.name;
			console.log(`${fileName}:\t${fileEncoding}`);
		}
	}
);
```
3:
```
import CharsetDetector from "./chardetng-wasm-wrapper.js";

const detector = await CharsetDetector.create();
const data = Uint8Array.of(0xa6, 0xb8, 0xb1,0x60,0xa5,0xce,0xb0,0xea,0xa6,0x72,0xbc,0xd0,0xb7,0xc7,0xa6,0x72,0xc5,0xe9,0xaa,0xed);
const encoding = detector.detect(data);

const decoder = new TextDecoder(encoding);
const text = decoder.decode(data);

console.log(encoding + ":\t" + text);	//Big5
```
