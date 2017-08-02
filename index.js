'use strict';
var Alexa = require("alexa-sdk");

var APP_ID = undefined;

var SKILL_NAME = "Complimentron";
var GET_COMPLIMENT_MESSAGE = "Here's your compliment: ";
var HELP_MESSAGE = "You can say give me a compliment, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

var compliments = [
    "You shine like the sun.",
    "If I were stuck on a desert island and had to choose between you and not being stuck on that island, I'd always choose you.",
    "I absolutely love the shirt you're wearing.",
    "Your smile is contagious.",
    "You look great today.",
    "You're a smart cookie. Yum, cookies.",
    "You are the most perfect you there is.",
    "You light up the room.",
    "You deserve a hug right now.",
    "You should be proud of yourself.",
    "Is that your picture next to the word charming in the dictionary?",
    "On a scale from 1 to 10, you're an 11.",
    "If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewComplimentIntent');
    },
    'GetNewComplimentIntent': function () {
        var compArr = compliments;
        var compIndex = Math.floor(Math.random() * compArr.length);
        var randomCompliment = compArr[compIndex];
        var speechOutput = GET_COMPLIMENT_MESSAGE + randomCompliment;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomCompliment);
    },
	'GetNamedComplimentIntent': function () {
		var intentObj = this.event.request.intent;
		var name = intentObj.slots.name.value;
        var compArr = compliments;
        var compIndex = Math.floor(Math.random() * compArr.length);
        var randomCompliment = compArr[compIndex];
        var speechOutput = name + ': ' + randomCompliment;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomCompliment);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};