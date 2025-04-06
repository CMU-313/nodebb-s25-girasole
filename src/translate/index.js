var request = require('request');

const translatorApi = module.exports;

translatorApi.translate = async function (postData) {
	const TRANSLATOR_API = "http://128.2.205.168:5000";
	try {
		const response = await fetch(TRANSLATOR_API + '/?content=' + postData.content);
		const data = await response.json();
		console.log(data);
		return [data["is_english"], data["translated_content"]];
	} catch (error) {
		console.error("Error during translation fetch:", error);
		return [false, postData.content]; // Fallback: assume not English, return original content
	}
}
