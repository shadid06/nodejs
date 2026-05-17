/*
 * Title: Quotes Library
 * Description: Utility library for getting a list of Quotes
 * Author: shamim hasnain
 * Date: 17/05/26
 *
 */

// Dependencies
import fs from 'node:fs';


// Quotes object - Module scaffolding
const quotes = {
    // Get all the quotes and return them to the user
    allQuotes() {
        // Read the text file containing the quotes
        const fileContents = fs.readFileSync(new URL('quotes.txt', import.meta.url), 'utf8');

        // Turn the string into an array
        const arrayOfQuotes = fileContents.split(/\r?\n/);

        // Return the array
        return arrayOfQuotes;
    }
};




// Export the library

export default quotes;