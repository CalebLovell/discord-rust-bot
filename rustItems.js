const getAllRustItems = async () => {
	// Launch browser and navigate to the RustLabs item page
	const puppeteer = require(`puppeteer`);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://rustlabs.com/group=itemlist`);

	// Item Array to Return
	const rustItems = [];

	// Grab all the item names via their span tags with class 'r-cell'
	const itemsList = await page.$$(`.r-cell`);
	// Loop through each item and push it to the item array
	for (let i = 0; i < itemsList.length; i++) {
		const itemInnerText = await itemsList[i].getProperty(`innerText`);
		const itemValue = await itemInnerText.jsonValue();
		rustItems.push(itemValue.toLowerCase());
	}

	return rustItems;
};

module.exports = getAllRustItems;
