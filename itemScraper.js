const puppeteer = require(`puppeteer`);

const scrapeItems = async url => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const [blueprint] = await page.$x(`//*[@id="left-column"]/div[1]/div[2]/img`);
	const blueprintAlt = await blueprint.getProperty(`alt`);
	const blueprintAltText = await blueprintAlt.jsonValue();

	console.log(blueprintAltText);

	browser.close();
};

scrapeItems(`https://rustlabs.com/item/bolt-action-rifle`);
