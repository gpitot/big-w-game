
const appNexusClickTracker = "${CLICK_URL}";


class Tracker {
    constructor({job, client, section}) {
        this.config = {
            job,
            client,
            section
        }

        if (job) {
            this.setUpNineTracking();
        }
    }

    setUpNineTracking = () => {
        const {job, client, section} = this.config;

        NINEAU_Loader.setup();
        NINEAU_Config.setOmnitureSuiteId('mi9studiosglobal');
        NINEAU_Config.setCategory('ads');
        NINEAU_Config.setSiteName(`${job}_${client}`);
        NINEAU_Config.setSectionName(section);
        NINEAU_Config.setSubsectionName('test');
        NINEAU_Config.setNielsenEnabled(false);
        NINEAU_Config.setAdcEnabled(false);
        NINEAU_Config.setPageTrackingOnRenderTracking(false);
        NINEAU_ThirdParty.initialize();

        this.trackingId = NINEAU_Config.getCategory() + ":" + NINEAU_Config.getSiteName() + ":" + NINEAU_Config.getSectionName()  + ":" + NINEAU_Config.getSubsectionName();
    }

    trackClick = (value) => {
        //_cta_clicked
        //_masthead_clicked
        //_wallpaper_clicked
        console.log('track click: ', value);
        NINEAU_ThirdParty.trackClick(this.trackingId + value, this.trackingId );        
    }
}

export default Tracker;

