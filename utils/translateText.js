const translateText = async (data, lang) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "en");
  encodedParams.set("target_language", lang); //mr - marathi , hi - hindi
  encodedParams.set("text", data);

  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "afd34a4d04msh62ecb5df5527e64p195ca4jsnd8a8c190277e",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: encodedParams,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = translateText;

/*
const encodedParams = new URLSearchParams();
encodedParams.set('source_language', 'en');
encodedParams.set('target_language', 'mr');
encodedParams.set('text', 'What is your name?');

const url = 'https://text-translator2.p.rapidapi.com/translate';
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'afd34a4d04msh62ecb5df5527e64p195ca4jsnd8a8c190277e',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
  body: encodedParams
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

*/
