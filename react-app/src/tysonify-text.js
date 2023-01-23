const tysonify = (string) => {
    const stringArray = string.split('');
    stringArray.forEach((letter, i) => {
        if (letter === 'c' && stringArray[i + 1] === 'e') stringArray.splice(i, 1, 'th');
        if (letter === 's') stringArray.splice(i, 1, 'th');
        if (letter === 'S') stringArray.splice(i, 1, 'Th');
    });
    return stringArray.join('');
};

export default tysonify

// console.log(tysonifyText('This is a test to see whether this tysonifytext function works'));
// console.log(tysonifyText('Seeing if this works agian'))
// console.log(tysonifyText('Maybe we can check out the words like place, face, race, taste'));;
