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
        "priorityFactor": 70
    },
    {
        "group": "grooming",
        "text": "shave",
        "priorityFactor": 50
    },
    {
        "group": "grooming",
        "text": "clip nails",
        "priorityFactor": 60
    },
    {
        "group": "grooming",
        "text": "brush teeth",
        "priorityFactor": 80
    },
    {
        "group": "grooming",
        "text": "floss teeth",
        "priorityFactor": 60
    },
    //CHORES - clean:
    {
        "group": "chores",
        "text": "wash clothes, do laundry",
        "priorityFactor": 80
    },
    {
        "group": "chores",
        "text": "wash dishes",
        "priorityFactor": 70
    },
    {
        "group": "chores",
        "text": "empty trash can",
        "priorityFactor": 60
    },
    {
        "group": "chores",
        "text": "clean table",
        "priorityFactor": 50
    },
    {
        "group": "chores",
        "text": "clean counter",
        "priorityFactor": 50
    },
    {
        "group": "chores",
        "text": "clean floor",
        "priorityFactor": 60
    },
    {
        "group": "chores",
        "text": "clean sink",
        "priorityFactor": 50
    },
    {
        "group": "chores",
        "text": "clean bathtub",
        "priorityFactor": 40
    },
    {
        "group": "chores",
        "text": "clean tiles on walls",
        "priorityFactor": 20
    },
    {
        "group": "chores",
        "text": "clean light switches",
        "priorityFactor": 10
    },
    {
        "group": "chores",
        "text": "clean windows",
        "priorityFactor": 30
    },
    //BODY - exercise:
    {
        "group": "body",
        "text": "do rehabilitation exercises",
        "priorityFactor": 80
    },
    {
        "group": "body",
        "text": "go climbing",
        "priorityFactor": 50
    },
    {
        "group": "body",
        "text": "go on walks",
        "priorityFactor": 60
    },
    {
        "group": "body",
        "text": "go hiking",
        "priorityFactor": 70
    },
    {
        "group": "body",
        "text": "practice handstand",
        "priorityFactor": 50
    },
    {
        "group": "body",
        "text": "practice planche",
        "priorityFactor": 50
    },
    {
        "group": "body",
        "text": "meditate",
        "priorityFactor": 30
    },
    {
        "group": "body",
        "text": "do martial arts",
        "priorityFactor": 10
    },
    //MIND - progress, be productive, learn, build:
    {
        "group": "mind",
        "text": "read programming boks",
        "priorityFactor": 40
    },
    {
        "group": "mind",
        "text": "read programming tutorials",
        "priorityFactor": 50
    },
    {
        "group": "mind",
        "text": "program on a project",
        "priorityFactor": 70
    },
    {
        "group": "mind",
        "text": "build a web site",
        "priorityFactor": 80
    },
    {
        "group": "mind",
        "text": "build a calisthenics park",
        "priorityFactor": 60
    },
    {
        "group": "mind",
        "text": "play mahjong",
        "priorityFactor": 30
    },
    {
        "group": "mind",
        "text": "play go",
        "priorityFactor": 40
    },
    {
        "group": "mind",
        "text": "play shogi",
        "priorityFactor": 40
    },
    {
        "group": "mind",
        "text": "draw pencil drawings",
        "priorityFactor": 10
    },
    {
        "group": "mind",
        "text": "write fantasy stories",
        "priorityFactor": 20
    },
    //RELAX / ENJOY - relax, enjoy:
    {
        "group": "relax / enjoy",
        "text": "dance salsa",
        "priorityFactor": 60
    },
    {
        "group": "relax / enjoy",
        "text": "watch movies",
        "priorityFactor": 40
    },
    {
        "group": "relax / enjoy",
        "text": "watch tv series",
        "priorityFactor": 50
    },
    {
        "group": "relax / enjoy",
        "text": "play video games",
        "priorityFactor": 40
    },
    {
        "group": "relax / enjoy",
        "text": "read fantasy novels",
        "priorityFactor": 70
    },
    {
        "group": "relax / enjoy",
        "text": "watch anime",
        "priorityFactor": 40
    },
    {
        "group": "relax / enjoy",
        "text": "read manga",
        "priorityFactor": 50
    },
    //vacation:
    {
        "group": "relax / enjoy",
        "text": "go mountain biking",
        "priorityFactor": 40
    },
    {
        "group": "relax / enjoy",
        "text": "go windsurfing",
        "priorityFactor": 20
    },
    {
        "group": "relax / enjoy",
        "text": "go snowboarding",
        "priorityFactor": 30
    },
    //COOK / EAT - food:
    {
        "group": "cook / eat",
        "text": "eat many meals",
        "priorityFactor": 70
    },
    {
        "group": "cook / eat",
        "text": "drink lots of water",
        "priorityFactor": 80
    },
    {
        "group": "cook / eat",
        "text": "eat many fruits",
        "priorityFactor": 80
    },
    {
        "group": "cook / eat",
        "text": "eat many vegetables",
        "priorityFactor": 60
    }
];
