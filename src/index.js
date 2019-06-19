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
        
        const left = appnexusClickUrl + 'https://ad.doubleclick.net/ddm/trackclk/N70003.2432504NINE.COM.AU/B22791320.248943278;dc_trk_aid=445418339;dc_trk_cid=117626760;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua='
        const right = appnexusClickUrl + 'https://ad.doubleclick.net/ddm/trackclk/N70003.2432504NINE.COM.AU/B22791320.248943278;dc_trk_aid=445474300;dc_trk_cid=117627339;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua='
        addClick(document.getElementById('leftPanel'), left);
        addClick(document.getElementById('rightPanel'), right);

        //img trackers
        const timestamp = new Date().getTime();
        const leftimg = `https://ad.doubleclick.net/ddm/trackimp/N70003.2432504NINE.COM.AU/B22791320.248943278;dc_trk_aid=445418339;dc_trk_cid=117626760;ord=${timestamp};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?`;
        const headimg = `https://ad.doubleclick.net/ddm/trackimp/N70003.2432504NINE.COM.AU/B22791320.248943278;dc_trk_aid=445474333;dc_trk_cid=117627342;ord=${timestamp};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?`;
        const rightimg = `https://ad.doubleclick.net/ddm/trackimp/N70003.2432504NINE.COM.AU/B22791320.248943278;dc_trk_aid=445474300;dc_trk_cid=117627339;ord=${timestamp};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?`;
        
        createImpressionImage(document.getElementById('leftPanel'), leftimg);
        createImpressionImage(document.getElementById('rightPanel'), rightimg);
        createImpressionImage(document.getElementById('nineMasthead'), headimg);
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