/*
 * Title: Basic Node app example
 * Description: Simple node application that print random quotes per second interval.
 * Author: shamim hasnain
 * Date: 11/09/19
 *
 */
// Dependencies
// নোট: ES Modules ব্যবহার করলে ফাইল এক্সটেনশন (.js) দেওয়া বাধ্যতামূলক
// ২. অবজেক্টটি ডিক্লেয়ার করার সময়ই তার প্রোপার্টিগুলো ডিফাইন করে দিন
import quotes from './lib/quotes/index.js';
import mathLibrary from './lib/math.js';
const app = {
    config: {
        timeBetweenQuotes: 1000,
    },
    printAQuote() {
        const allQuotes = quotes.allQuotes();
        const numberOfQuotes = allQuotes.length;
        const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes);
        const selectedQuote = allQuotes[randomNumber - 1];
        if (selectedQuote) {
            console.log(selectedQuote);
        }
    },
    indefiniteLoop() {
        // এখানে সরাসরি 'this' অথবা 'app' ব্যবহার করা যাবে
        setInterval(this.printAQuote, this.config.timeBetweenQuotes);
    }
};
// ৩. লুপটি চালু করুন
app.indefiniteLoop();
