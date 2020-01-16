const puppeteer = require(`puppeteer`);

const scrapeItem = async url => {
	// Launch browser and navigate to a new page at the given url
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	// ---------- Item Name -----------
	// Grab the name of the item by an xpath, then get its alt property and json value
	const [itemName] = await page.$x(`//*[@id="left-column"]/div[1]/div[2]/img`);
	const itemNameAlt = await itemName.getProperty(`alt`);
	const itemNameAltText = await itemNameAlt.jsonValue();
	const plural = itemNameAltText.charAt(itemNameAltText.length - 1) === `s` ? true : false;
	const costOrCosts = plural ? `cost` : `costs`;

	// -------- Research Cost ---------
	try {
		// Grab the research cost of the item by its xpath, then get its inner text and json value (minus the 'x' char)
		const [researchCost] = await page.$x(`//*[@id="left-column"]/div[2]/div[4]/table/tbody/tr/td[3]/a/span`);
		const researchCostNumber = await researchCost.getProperty(`innerText`);
		const researchCostNumberText = await researchCostNumber.jsonValue();
		const researchCostNumberTextFixed = researchCostNumberText.substr(1);
		// Set the final string
		const researchString = `${plural ? `` : `A `}${itemNameAltText} ${costOrCosts} ${researchCostNumberTextFixed} Scrap to Research.`;
		console.log(researchString);
	} catch (err) {
		console.log(`This item cannot be researched.`);
		// console.log(err);
	}

	// ---------- Craft Cost ----------
	try {
		let costString = `${plural ? `` : `A `}${itemNameAltText} ${costOrCosts} `;
		const [ingredients] = await page.$x(`//*[@id="left-column"]/div[2]/div[2]/table/tbody/tr[1]/td[3]`);
		// const [ingredients] = await page.$x(`/html/body/div[1]/div[1]/div[2]/div[3]/table/tbody/tr/td[3]`);

		const ingredientsList = await ingredients.$$(`a`);
		for (let i = 0; i < ingredientsList.length; i++) {
			const ingredientImg = await ingredientsList[i].$(`img`);
			const ingredientImgAlt = await ingredientImg.getProperty(`alt`);
			const ingredientImgAltText = await ingredientImgAlt.jsonValue();

			const ingredientSpan = await ingredientsList[i].$(`span`);
			const ingredientSpanNumber = await ingredientSpan.getProperty(`innerText`);
			const ingredientSpanNumberText = await ingredientSpanNumber.jsonValue();
			let ingredientSpanNumberTextFixed = await ingredientSpanNumberText.substr(1);
			// If there is no span text, set the ingredient's value to 1 like it would be in game
			ingredientSpanNumberTextFixed === `` ? (ingredientSpanNumberTextFixed = 1) : null;
			// Set the ingredientString
			const ingredientString = `${ingredientSpanNumberTextFixed} ${ingredientImgAltText}`;
			// Add a comma to the costString + ingredientString until the last loop - then add the string's ending text
			if (ingredientsList.length > 0) {
				i !== ingredientsList.length - 1 ? (costString += `${ingredientString}, `) : (costString += `and ${ingredientString} to make `);
			} else {
				costString += `${ingredientString} `;
			}
		}
		const [workbench] = await page.$x(`//*[@id="left-column"]/div[2]/div[2]/table/tbody/tr[1]/td[5]`);
		// const [workbench] = await page.$x(`/html/body/div[1]/div[1]/div[2]/div[3]/table/tbody/tr/td[5]`);
		const workbenchATag = await workbench.$(`a`);
		try {
			const workbenchATagHREF = await workbenchATag.getProperty(`href`);
			const workbenchATagHREFText = await workbenchATagHREF.jsonValue();
			const workbenchATagHREFTextFixed = workbenchATagHREFText.substr(workbenchATagHREFText.length - 1, 1);
			costString += `on a Level ${workbenchATagHREFTextFixed} Work Bench.`;
		} catch {
			costString += `without the need for a Work Bench.`;
		}
		console.log(costString);
	} catch (err) {
		console.log(`This item cannot be crafted.`);
		// console.log(err);
	}

	browser.close();
};

// TODO: Check if an item has a given tab before running code
// TOOD: Recycling
// TODO: Run basic and exact xpath to account for items that use either
// TODO: Fix items that use Rope
// TODO: Put info in a database?
// TODO: Make this function run dynamically in the bot
// TODO: Scrape nicknames for guns from the Wikia and let users find items by them

scrapeItem(`https://rustlabs.com/item/bolt-action-rifle`);

console.log(`test addition to see if Discord WebHook is working, delete this line later...`)