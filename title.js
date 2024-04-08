const corpus = `This text contains a variety of titles and non-titles that may or may not have capital letters numbers or puntuation in them.
	1.	This is a Title.
	2.	this is not a title.
	3.	A Knight's Tale. Is a book title but this is a description.
	- Some titles are preceded by bullets but not all bulltets precede titles.
	- My Notebook
	- Portland, OR - is a nice place to eat out.
	- Ashland, Oregon - is a nice place to visit the theatre.
	A long sentance may include a title like The Rialto Poolroom in the middle.
`;

// We want to preserve the text but replace it with processed text that can either 
// A. add underscores between the title words, or
// B. wrap the title in a HTML Anchor HREF link to the title as a #title=Actual-Title bookmark link.

function enhancedPhrase(text){
	return text.replace(" ", "_");
}

function isAlpha(c){
	const i = c.toUpperCase().charCodeAt(0);
	return i >= "A".charCodeAt(0) && i <= "Z".charCodeAt(0);
}

function onlyAlpha(word){
	const output = [];
	for(c in word.split("")){
		if(isAlpha(c)){
			output.push(c);
		}
	}
	return output.join("");
}

function isTitlePart(word){
	word = onlyAlpha(word);
	if(word.length === 0) return false;
	if(word.length === 1 && word[0] !== word[0].toUpperCase()) return false;
	if(word.length === 2) return true; //MAYBE
	if(word[0] === word[0].toUpperCase()){
		return true;
	}
}

const MINIMUM_WORDS_FOR_TITLE = 2;
let words_for_title = 0;
let phrase = [];

function handleWord(word, index, all){
	if(isTitlePart(word)){
		words_for_title++;
		phrase.push(word);
		return "";
	}else{
		const output = phrase.join(" ");
		words_for_title = 0;
		phrase = [];
		return enhancedPhrase(output);
	}
}


function handleLine(line){
	const parts = line.split(" ");
	const output = parts.map(handleWord);
	return output.join(" ");
}

function handleCorpus(text){
	const lines = text.split("\n");
	const output = lines.map(handleLine);
	return output.join("\n");
}
//TESTS
console.log(corpus);
result = handleCorpus(corpus);
console.log(result === corpus);
console.log(result);


