mod utils;

use wasm_bindgen::prelude::*;
use chardetng::EncodingDetector;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn detect(buffer: &[u8]) -> i32 {
	let mut detector: EncodingDetector = chardetng::EncodingDetector::new();

	detector.feed(buffer, true);
	let charset: &str = detector.guess(None, true).name();
	let code: i32 = match charset {
		"UTF-8" => 12,
		"GB18030" => 54,		"GBK" => 10,			"Big5" => 11,
		"EUC-KR" => 45,			"Shift_JIS" => 14,		"windows-1250" => 22,
		"windows-1251" => 23,	"windows-1252" => 0,	"windows-1253" => 28,
		"windows-1254" => 4,	"windows-1255" => 32,	"windows-1256" => 36,
		"windows-1257" => 39,	"windows-1258" => 40,	"windows-874" => 53,
		"ISO-8859-2" => 1,		"ISO-8859-7"=> 21,		"EUC-JP" => 46,
		"ISO-2022-JP" => 176,	"KOI8-U" => 51,			"ISO-8859-5" => 77,
		"IBM866" => 7,			"KOI8-R" => 9,			"ISO-8859-8-I" => 60,
		"ISO-8859-4" => 3,		"ISO-8859-6" => 43,		"ISO-8859-8" => 44,
		"ISO-8859-13" => 101,	"ISO-8859-3" => 2,		"ISO-8859-10" => 5,
		"ISO-8859-14" => 103,	"ISO-8859-15" => 6,		"ISO-8859-16" =>164,
		_ => -1
    };

	return code;
}
