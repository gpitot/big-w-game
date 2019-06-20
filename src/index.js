import Map from './js/map';
import AdScrolling from './js/ad-scrolling';
import Tracker from './js/tracking';

import {loadImages} from './js/load-images';
import {addClick} from './js/clicks';


const parent = document.getElementById('unitContainer');
console.log(hostingLocation);

if (parent) {
    $(parent).load(hostingLocation + 'unit/index.unit', htmlLoaded);
}

let initialAction = false;
let tracker;
function swapImageHalfpage(toy) {
    const halfPageEl = window.parent.document.querySelector('iframe[width="300px"]');
    if (halfPageEl) {
        if (halfPageEl.contentWindow.winToyFromFirePlace) {
            //might be wrong halfpage in place
            halfPageEl.contentWindow.winToyFromFirePlace(toy);
        }
        
    }

    if (!initialAction && tracker) {
        initialAction = true;
        //track initial move
        tracker.trackClick('interaction');
    }
}


function htmlLoaded() {
    
    //pass job , client, section
    //if none then dont track
    
    //setup ad scrolling
    
    if (window.frameElement) {
        //pass job , client, section
        tracker = new Tracker({job:'6417', client:'bigw', section:'fireplace'})
        const adscroller = new AdScrolling({iframe : window.frameElement});
        adscroller.setUpDimensions();
    }

    //images
    loadImages(parent, hostingLocation, () => {
        const dimensions = {
            rows : 3,
            cols : 12,
        }
        const parentEl = document.getElementById('game');
        
        new Map({dimensions, parentEl, destroyCallback:swapImageHalfpage})

        // click trackers
        
        const left = appnexusClickUrl + leftClick;
        const right = appnexusClickUrl + rightClick;
        addClick(document.getElementById('leftPanel'), left);
        addClick(document.getElementById('rightPanel'), right);

       
        createImpressionImage(document.getElementById('leftPanel'), leftImp);
        createImpressionImage(document.getElementById('rightPanel'), rightImp);
        createImpressionImage(document.getElementById('nineMasthead'), headImp);
    })

    //loadCircles();

}

function createImpressionImage(parent, src) {
    if (!parent) return;
    const img = new Image();
    img.src = src;
    img.width = "1";
    img.height = "1";
    img.border = "0";
    img.alt = "Advertisement"
    parent.appendChild(img);
}


function loadCircles() {
    const circles = Array.from(document.querySelectorAll('.circle'));
    circles.forEach((circle) => {
        circle.style.height = circle.getBoundingClientRect().width + 'px';
    })
}