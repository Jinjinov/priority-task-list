// TODO:: YAML:
// https://stackoverflow.com/questions/9043765/how-to-parse-yaml-in-the-browser
// https://stackoverflow.com/questions/4335804/javascript-yaml-parser
// https://github.com/nodeca/js-yaml
// https://github.com/jeremyfa/yaml.js/
// https://github.com/tj/js-yaml
// https://github.com/connec/yaml-js

// TODO:: sleep, work, family / friends, shopping, exercises

var tasks = [
    //GROOM - clean:
    {
        "group": "grooming",
        "text": "shower",
        "priorityFactor": 1
    },
    {
        "group": "grooming",
        "text": "shave",
        "priorityFactor": 1
    },
    {
        "group": "grooming",
        "text": "clip nails",
        "priorityFactor": 1
    },
    {
        "group": "grooming",
        "text": "brush teeth",
        "priorityFactor": 1
    },
    {
        "group": "grooming",
        "text": "floss teeth",
        "priorityFactor": 1
    },
    //CHORES - clean:
    {
        "group": "chores",
        "text": "wash clothes, do laundry",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "wash dishes",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "empty trash can",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean table",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean counter",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean floor",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean sink",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean bathtub",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean tiles on walls",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean light switches",
        "priorityFactor": 1
    },
    {
        "group": "chores",
        "text": "clean windows",
        "priorityFactor": 1
    },
    //BODY - exercise:
    {
        "group": "body",
        "text": "do rehabilitation exercises",
        "priorityFactor": 1
    },
    {
        "group": "body",
        "text": "go climbing",
        "priorityFactor": 1
    },
    {
        "group": "body",
        "text": "go on walks",
        "priorityFactor": 1
    },
    {
        "group": "body",
        "text": "go hiking",
        "priorityFactor": 1
    },
    {
        "group": "body",
        "text": "practice handstand",
        "priorityFactor": 1
    },
    {
        "group": "body",
        "text": "practice planche",
        "priorityFactor": 1
    },
    {
        "group": "body",
        "text": "meditate",
        "priorityFactor": 1
    },
    {
        "group": "body",
        "text": "do martial arts",
        "priorityFactor": 1
    },
    //MIND - progress, be productive, learn, build:
    {
        "group": "mind",
        "text": "read programming boks",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "read programming tutorials",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "program on a project",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "build a web site",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "build a calisthenics park",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "play mahjong",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "play go",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "play shogi",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "draw pencil drawings",
        "priorityFactor": 1
    },
    {
        "group": "mind",
        "text": "write fantasy stories",
        "priorityFactor": 1
    },
    //RELAX / ENJOY - relax, enjoy:
    {
        "group": "relax / enjoy",
        "text": "dance salsa",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "watch movies",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "watch tv series",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "play video games",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "read fantasy novels",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "watch anime",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "read manga",
        "priorityFactor": 1
    },
    //vacation:
    {
        "group": "relax / enjoy",
        "text": "go mountain biking",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "go windsurfing",
        "priorityFactor": 1
    },
    {
        "group": "relax / enjoy",
        "text": "go snowboarding",
        "priorityFactor": 1
    },
    //COOK / EAT - food:
    {
        "group": "cook / eat",
        "text": "eat many meals",
        "priorityFactor": 1
    },
    {
        "group": "cook / eat",
        "text": "drink lots of water",
        "priorityFactor": 1
    },
    {
        "group": "cook / eat",
        "text": "eat many fruits",
        "priorityFactor": 1
    },
    {
        "group": "cook / eat",
        "text": "eat many vegetables",
        "priorityFactor": 1
    }
];
