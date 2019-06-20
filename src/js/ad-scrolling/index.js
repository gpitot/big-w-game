import config from './config';

//fireplace stays at top of page under header


class AdScrolling {
    constructor({iframe}) {
        this.iframe = iframe;
        this.parentAdvert = this.getParentAdvert();
        this.config = this.getConfig();

        

        window.parent.window.addEventListener('scroll', this.handleScroll);
    }

    setUpDimensions = () => {
        this.setUpParentDimensions();
        this.setUpIframeDimensions();


        //honey latest fix
        const parentUrl = window.parent.location
        const url = `${parentUrl.protocol}//${parentUrl.host}${parentUrl.pathname}`
        if (url === 'https://honey.nine.com.au/latest') {
            window.document.getElementById('siteContent').style.width = "1230px";
        }
    }

    getParentAdvert = () => {
        let parent = null;
        const adTypes = [
            'BILLBOARD',
            'MASTHEAD',
            'Masthead'
        ]
        if (!window.parent) return parent;

        for (let i=0; i<adTypes.length; i+=1 ) {
            parent = window.parent.document.querySelector(`[data-ad-type="${adTypes[i]}"]`);
            if (parent) return parent;
        }
        
        return parent;
        
    }

    getConfig = () => {
        const url = window.parent.location.href;
        for (let i=0; i<config.length; i+=1) {
            if (url.indexOf(config[i].site) >= 0) {
                return config[i].config;
            }
        }
    }

    setUpIframeDimensions = () => {
        if (!this.iframe) return;
        const style = this.iframe.style;
        style.width = "100%";
        style.height = "1000px";
        style.position = "fixed";
        style.left = "50%";
        style.transform = "translate(-50%, 0)";
    }

    setUpParentDimensions = () => {
        if (!this.parentAdvert) return;
        const style = this.parentAdvert.style;
        style.marginTop = this.config.adNodeMarginTop + 'px';
        style.marginBottom = this.config.adNodeMarginBottom + 'px';
        style.maxHeight = "1000px";
        style.position = "relative";
        
        if (!window.parent) return;
        const mastHead = window.parent.document.querySelector('.mastheadShown');
        if (mastHead) {
            mastHead.style.height = "250px";
        }

        if (this.config.zIndex) {
            this.config.zIndex();
        }
        
    }


    handleScroll = (e) => {
        const scrollTop = window.parent.pageYOffset;
        const {responsiveScroll} = this.config;
        const style = this.iframe.style;
        const mastHeadStyle = document.getElementById('nineMasthead') ? document.getElementById('nineMasthead').style : {};
        

        if (scrollTop >= 0 && scrollTop <= -responsiveScroll) {
            style.transform = `translate(-50%, ${-scrollTop}px)`;
            mastHeadStyle.transform = "translateY(0)"

        } else if (scrollTop > -responsiveScroll && scrollTop <= (-responsiveScroll+250)) {
            style.transform = `translate(-50%, ${responsiveScroll}px)`;
            mastHeadStyle.transform = `translateY(${-responsiveScroll-scrollTop}px)`

        } else if (scrollTop > (-responsiveScroll+250)) {
            style.transform = `translate(-50%, ${responsiveScroll}px)`;
            mastHeadStyle.transform = "translateY(-250px)"
        }
    }
}



export default AdScrolling;