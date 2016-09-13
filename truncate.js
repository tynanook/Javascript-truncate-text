"use strict";


/* ============================================================= */
/*    Declarations                                              */
/* =========================================================== */
var originalText = "There are two hard things in Computer Science: Cache invalidation, naming things, and off-by-one errors.";
var wordLimit = 8;
var charLimit = 80;
var ellipseText;


/* ============================================================= */
/*    Trucate Button - excute, update forms, output results     */
/* =========================================================== */
function onClickTruncate() {

    // get the nodes
    var tempEl_wrapper = document.getElementById("the-data");
    var UL_x = document.getElementsByTagName("ul");
    var LI_x = document.getElementsByTagName("li");

    // remove any existing listing of prior results
    if (UL_x.length > 0) {
        tempEl_wrapper.removeChild(UL_x[0]);
        UL_x = document.getElementsByTagName("ul");
    }
    while (LI_x.length > 0) {
        tempEl_wrapper.removeChild(LI_x[0]);
        LI_x = document.getElementsByTagName("li");
    }


    // execute truncate functions
    var trunc;
    var longText = document.getElementById("Sent-Complete").value;
    if (document.getElementById('byWords').checked) {
        //alert("word limit is checked");
        longText = document.getElementById("Sent-Complete").value;
        wordLimit = document.getElementById("numOfWords").value;
        trunc = truncateWords(longText, wordLimit);
    } else if (document.getElementById('byChars').checked) {
        wordLimit = document.getElementById("numOfChars").value;
        trunc = truncateCharacters(longText, wordLimit);
    } else {
        alert("neither limit is checked! This condition should never occur");
    }


    // output truncated sentence to form textarea
    document.getElementById("Sent-Truncated").value = trunc.textOut;

    // output data results below table, for peer review checking
    var tempEl_UL = document.createElement("ul");
    tempEl_wrapper.appendChild(tempEl_UL);
    for (var key in trunc) {
        var tempEl_LI = document.createElement("li");
        var strObjElement = key + " = " + trunc[key]
        var tempEl_text = document.createTextNode(strObjElement);
        tempEl_LI.appendChild(tempEl_text);
        tempEl_wrapper.appendChild(tempEl_LI);
    }
}



/* ============================================================= */
/*    Events - onClicks -- radio buttons, force only one active */
/* =========================================================== */
function onClickWords() {
    document.getElementById('byWords').checked = true;
    document.getElementById('byChars').checked = false;
}

function onClickChars() {
    document.getElementById('byChars').checked = true;
    document.getElementById('byWords').checked = false;
}



/* ================================== */
/*    Truncate WORDs                 */
/* ================================ */

if (false) { // set to TRUE if want to datalog truncate by WORD results to console
    // the 5 diff senerios:
    ellipseText = truncateWords(originalText, wordLimit); // generic case
    //ellipseText = truncateWords(originalText);  // case where no limit is given
    //ellipseText = truncateWords(originalText, -1);  // case where limit is < 0
    //ellipseText = truncateWords(originalText, 15);  // case were limit = words in string
    //ellipseText = truncateWords(originalText, 16);   // case where limit > words in string

    console.log(ellipseText);
    console.log("ellipseText.textIn = " + ellipseText.textIn);
    console.log("ellipseText.wordCountIn = " + ellipseText.wordCountIn);
    console.log("ellipseText.wordLimitIn = " + ellipseText.wordLimitIn);
    console.log("ellipseText.wordLimitOut = " + ellipseText.wordLimitOut);
    console.log("ellipseText.textOut = " + ellipseText.textOut);
    console.log("ellipseText.wordCountOut = " + ellipseText.wordCountOut);
}


/* ================================== */
/*    Truncate CHARs                 */
/* ================================ */

if (true) { // set to TRUE if want to datalog truncate by CHAR results to console

    // the 5 diff senerios:
    ellipseText = truncateCharacters(originalText, charLimit);
    //ellipseText = truncateCharacters(originalText);
    //ellipseText = truncateCharacters(originalText, -1);
    //ellipseText = truncateCharacters(originalText, originalText.length);
    //ellipseText = truncateCharacters(originalText, originalText.length+1);

    console.log(ellipseText);
    console.log("ellipseText.textIn = " + ellipseText.textIn);
    console.log("ellipseText.wordCountIn = " + ellipseText.wordCountIn);
    console.log("ellipseText.charCountIn = " + ellipseText.charCountIn);
    console.log("ellipseText.charLimitIn = " + ellipseText.charLimitIn);
    console.log("ellipseText.charLimitOut = " + ellipseText.charLimitOut);
    console.log("ellipseText.textOut = " + ellipseText.textOut);
    console.log("ellipseText.wordCountOut = " + ellipseText.wordCountOut);
    console.log("ellipseText.charCountOut = " + ellipseText.charCountOut);

}



/* ================================== */
/*    Functions                      */
/* ================================ */

function truncateWords(longText, wordLimit) {
    // longText (a String with several words in it)
    // wordLimit (an Integer that sets the number of words you want in the returned text)

    // declaration, assignments
    var splitWords = [];
    var numWords = 0;
    var numWords_Short = 0;
    // var numWords2Remove = 0; not used
    var arrTruncWords = [];
    var strEllipses = "...";
    var shortText_local = "";
    var wordLimitIn = wordLimit;





    // ** split longText into an Array
    longText = longText.replace(/\s\s+/g, ' '); /* rm spc tab nl */
    splitWords = longText.split(' ');
    numWords = splitWords.length; // ** length = number of words Array


    // ** case when no numWords function argument, or if it is
    if (wordLimit === undefined) { // if not entered as argument
        wordLimit = 6;
    } else if (wordLimit < 1) { // if less than 1 (0 or negative)
        wordLimit = 7;
    }

    if (wordLimit > numWords) { // if > words in string
        wordLimit = numWords;
    }

    // NOTE: this is not used (not necessary for current requirements)
    //numWords2Remove = numWords - wordLimit;      // ** # of words 2be removed


    arrTruncWords = splitWords.splice(0, wordLimit); // remove extra words
    numWords_Short = arrTruncWords.length;
    if (numWords_Short !== numWords) {
        arrTruncWords.push(strEllipses); // add ellipses "..."
    }
    shortText_local = arrTruncWords.join(' '); // recreate string wo extra words


    var ellipseText_local = { // create object
        textIn: longText,
        textOut: shortText_local,
        wordCountIn: numWords,
        wordCountOut: numWords_Short,
        wordLimitIn: wordLimitIn,
        wordLimitOut: wordLimit
    };

    return ellipseText_local; // rtn string
}



function truncateCharacters(longText, charLimit) {
    // longText (a String with several words in it)
    // CharLimit (an Integer that sets the number of characters you want in the returned text)

    // Question 1.  Should CharLimit include the " ...", which is 4 additional characters?

    // declaration, assignments
    var splitWords = [];
    var numWords = 0;
    var arrTruncWords = [];
    var strEllipses = "...";
    var shortText_local = "";
    var charLimitIn = charLimit;
    var shortIndex = -1;
    var isAllofString = false;
    var numWords_Short = 0;

    // remove unnecssary space, etc., from longText
    longText = longText.replace(/\s\s+/g, ' '); // rm spc tab nl


    // ** case when no CharLimit function argument, or if it is
    if (charLimit === undefined) { // if not entered as argument
        charLimit = 60; // arbitrary
    } else if (charLimit < 1) { // if less than 1 (0 or negative)
        charLimit = 70; // arbitrary
    } else {
        if (charLimit >= longText.length) { // restrict limit to string size
            charLimit = longText.length;
            isAllofString = true; // flag for unique case of last word
        }
    }


    // remove part of string based on char limit, but only get full words
    shortText_local = longText.slice(0, charLimit);
    if (longText[charLimit] === " " || isAllofString) {
        shortIndex = charLimit;
    } else {
        shortIndex = shortText_local.lastIndexOf(" ");
        shortText_local = shortText_local.slice(0, shortIndex);
    }


    // calc num of words passed into function; rtn info only (not used in function)
    splitWords = longText.split(' ');
    numWords = splitWords.length;

    // get words limited by char limit
    splitWords = shortText_local.split(' ');
    numWords_Short = splitWords.length;


    arrTruncWords = splitWords.splice(0, numWords_Short); // remove extra words
    if (!isAllofString) {
        arrTruncWords.push(strEllipses); // add ellipses "..."
    }
    shortText_local = arrTruncWords.join(' '); // recreate string wo extra words


    var ellipseText_local = { // create object
        textIn: longText,
        textOut: shortText_local,
        charCountIn: longText.length,
        charCountOut: shortText_local.length,
        wordCountIn: numWords,
        wordCountOut: numWords_Short,
        charLimitIn: charLimitIn,
        charLimitOut: charLimit
    };


    return ellipseText_local; // rtn string
}
