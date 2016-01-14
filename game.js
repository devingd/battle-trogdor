/*
1. require the readline module
2. make a prompt that asks if the player wants to play
*/
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var hero = {
    health: 100,
    attack: 25,
    heal: 25
};
var trogdor = {
    health: 100,
    attack: 30,
    heal: 0
};

rl.question('Do you want to play a game? (y/n) ', function(answer) {
    if(answer.substr(0, 1).toLowerCase() == 'y') {
        choice();
    } else {
        rl.close();
    }
});

function choice() {
    rl.question('Do you want to Fight (f), Run Away (r), or Heal (h) (You: '+hero.health+ '/ Trogdor: '+trogdor.health+')? ', function(answer) {
        var ch = answer.substr(0, 1).toLowerCase();
        switch (ch) {
            case 'f': return fight();
            case 'r': return flee();
            case 'h': return heal();
            default: choice();
        }
    });
}

function fight() {
    var give = Math.round(Math.random() * hero.attack);
    var take = Math.round(Math.random() * trogdor.attack);
    hero.health -= take;
    trogdor.health -= give;
    console.log('You took '+take+' damage. Health remaining: '+hero.health);
    console.log('Trogdor took '+give+' damage. Health remaining: '+trogdor.health);
    if(trogdor.health <= 0) {
        console.log('You Win!');
        rl.close();
    } else if(hero.health <= 0) {
        console.warn('You\'re Dead');
        rl.close();
    }
    choice();
}

function flee() {
    var escape = (Math.round(Math.random() * 10) > 5);
    if(escape) {
        console.log('es-cape-ay... That spelled just escape! You made it!... coward...');
        rl.close();
    } else {
        var damage = Math.round(Math.random() * hero.attack);
        hero.health -= damage;
        console.log('You coward! You can\'t run away from Trogdor');
        console.log('You took ' + damage + ' damage for your cowardice.');
        choice();
    }
}

function heal() {
    if(hero.health >= 100) {
        console.log('You\'re already at full health! Go fight something...');
    } else {
        hero.health += hero.heal;
        if(hero.health > 100) {
            hero.health = 100;
        }
        console.log('You healed for ' + hero.heal + '. Hero Health: ' + hero.health);
        var trogdorHit = (Math.round(Math.random() * 10) > 5);
        var damage = Math.round(Math.round(Math.random() * 10)/5);
        if(trogdorHit) {
            console.log('Trogdor attacked while you were healing and you took ' + damage + ' damage.');
        }
    }

    choice();
}