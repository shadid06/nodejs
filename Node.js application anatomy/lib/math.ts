/*
 * Title: Math Library
 * Description: Utility library for math-related functions
 * Author: shamim hasnain
 * Date: 17/05/2026
 *
 */

// Math object - Module scaffolding
const math = {
    getRandomNumber(min: number, max: number): number {
        const minimum = typeof min === 'number' ? min : 0;
        const maximum = typeof max === 'number' ? max : 0;
        return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
    }
};

// Export the library
export default math;
