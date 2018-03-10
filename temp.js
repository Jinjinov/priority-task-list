function getWidthOfText(txt, fontsize, fontname){
    if(getWidthOfText.e === undefined){
        getWidthOfText.e = document.createElement('span');
        getWidthOfText.e.style.display = "none";
        document.body.appendChild(getWidthOfText.e);
    }
    getWidthOfText.e.style.fontSize = fontsize;
    getWidthOfText.e.style.fontFamily = fontname;
    getWidthOfText.e.innerText = txt;
    return getWidthOfText.e.offsetWidth;
}

function deleteDatabase(){
    new PouchDB("prioritytasklist").destroy().then(function () {
        // database destroyed
    }).catch(function (err) {
        // error occurred
    })
}

    // https://stackoverflow.com/questions/2954659/css-size-of-buttons-in-chrome-is-different-than-firefox
    // https://stackoverflow.com/questions/7229568/input-height-differences-in-firefox-and-chrome
    // https://stackoverflow.com/questions/6184210/how-can-i-control-the-height-of-text-inputs-and-submit-input-buttons-in-differen
    // https://stackoverflow.com/questions/18582606/input-field-chrome-and-firefox-shows-different
    // https://stackoverflow.com/questions/20477823/select-html-element-with-height
    // https://stackoverflow.com/questions/2547354/how-to-standardize-the-height-of-a-select-box-between-chrome-and-firefox

    // TODO:: pwa - chrome developer tools - audit - lighthouse:
    // HTTPS
    // HTTP/2
    // TODO:: development mode -> production mode

    // TODO::LATER sign in: using Google, Facebook, Twitter, ...
    // - https://github.com/websanova/vue-auth
    // - https://github.com/dgrubelic/vue-authenticate
    // X - https://github.com/auth0-blog/vue-jwt-authentication - NodeJS, JSON Web Token

    // TODO::LATER one database per user - https://gist.github.com/nolanlawson/9676093

    // TODO::SOON repeat interval: fixed interval
    // TODO::SOON scheduled time: time in day / day in week / day in month / day in year
    // TODO::SOON fixed date
    // - duration is more important: sleep, work - scheduled time
    // - ‎number of repetitions is more important: brush teeth, shower, shave - time elapsed since last repetition

    // TODO::SOON groups with base priority offset: y = k * x + n
    // - sleep / rest
    // - work
    // - groom
    // - cook / eat
    // - chores
    // - body
    // - mind
    // - relax / enjoy

    // TODO::LATER detailed first step plan: what, when, where, who, why, how, ...

    // TODO::LATER counter of minutes spent on task
    // TODO::LATER completed: too soon / on time / too late --> auto priority adjustment
    // TODO::LATER suggested priority

    // https://stackoverflow.com/questions/19214453/rich-text-editor-replacement-for-html-textarea
    // https://stackoverflow.com/questions/17785845/convert-html-tag-in-textarea-to-rich-text
    // https://stackoverflow.com/questions/2580247/can-i-embed-html-formatting-inside-of-a-textarea-tag
    // https://stackoverflow.com/questions/10404312/html5-rich-text-inside-textarea
    // https://github.com/guardian/scribe

    // https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links

    // https://github.com/SoapBox/linkifyjs
    // https://github.com/nfrasser/linkify-shim/blob/master/linkify-html.js - 23.5 KB - optional
    // https://github.com/nfrasser/linkify-shim/blob/master/linkify-string.js - 2.5 KB - optional
    // https://github.com/nfrasser/linkify-shim/blob/master/linkify.js - 47.7 KB - required
    // https://github.com/phanan/vue-linkify

    // https://github.com/egoist/autolink.js - 3.47 KB
    // https://github.com/vue-component/vue-autolink

    // https://github.com/bryanwoods/autolink-js/blob/master/autolink-min.js - 578 Bytes
    // https://github.com/alexcorvi/anchorme.js/blob/gh-pages/dist-browser/anchorme.min.js - 18.5 KB - hardcoded url
    // https://github.com/gregjacobs/Autolinker.js/blob/master/dist/Autolinker.min.js - 36.7 KB - hardcoded url
    // https://github.com/ljosa/urlize.js/blob/master/urlize.js - 11.3 KB

    // TODO::LATER update github Projects
    // TODO::LATER update github Wiki
    // TODO::LATER update github Insights / Community


    // https://medium.com/js-dojo/7-ways-to-define-a-component-template-in-vuejs-c04e0c72900d
    // https://sebastiandedeyne.com/posts/2016/dealing-with-templates-in-vue-20

    // https://stackoverflow.com/questions/36170425/detect-click-outside-element/36180348
    // https://jsfiddle.net/70vm3jrd/1/

    // https://stackoverflow.com/questions/11805352/floatleft-vs-displayinline-vs-displayinline-block-vs-displaytable-cell
    // https://stackoverflow.com/questions/15172520/advantages-of-using-displayinline-block-vs-floatleft-in-css

    // https://github.com/egoist/vue-autosize-textarea
    // https://github.com/egoist/vue-autosize-textarea/issues/1
    // https://github.com/mage3k/vue-autosize
    // https://github.com/Nerdinacan/vue-autosize-textarea

    // https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs


    // https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
    // https://vuejs.org/v2/guide/components.html#sync-Modifier
    // https://medium.com/front-end-hacking/vues-v-model-directive-vs-sync-modifier-d1f83957c57c


    // https://stackoverflow.com/questions/44245494/reinvoking-vue-js-html-parsing
    // https://stackoverflow.com/questions/39516731/dynamic-html-elements-in-vue-js

    // https://stackoverflow.com/questions/1997084/prevent-parent-container-click-event-from-firing-when-hyperlink-clicked
    // https://stackoverflow.com/questions/30536571/vuejs-prevent-default-on-link-click-but-also-capture-object
    // https://vuejs.org/v2/guide/events.html

    // https://vuejs.org/v2/guide/list.html#Displaying-Filtered-Sorted-Results