/**
 * Standalone tiny-slider implementation
 * It wraps the original tiny-slider script into an instantiable M2 component
 */
define([
    'uiClass',
    'jquery',
    'underscore',
    'slick'
], function(Class, $, _){
    'use strict';

    return Class.extend({
        defaults: {
            slider: null,
            options:{
            }
        },
        initialize: function(options, element){
            this._super(options, element);
            this.element = element;
            var updateDebounced = _.debounce(this._mapClasses.bind(this), 500, false);
            $(element).on('setPosition', updateDebounced);
            this.slider = $(element).slick(this._mapOptions(this.options));

        },
        _mapClasses(){
            $('.slick-slide', this.element).each((index, item) => {
                var slide = $('> div > *', item),
                    classes = slide.attr("class") || slide.attr('data-classes');
                slide.attr('class', null).attr('data-classes', classes);
                $(item).addClass(classes);
            });
        },
        _mapOptions(base = this.options){
            var mapping = {};
            if('items' in base){
                mapping.slidesToShow = base.items;
            }
            if('nav' in base){
                mapping.arrows = base.nav;
            }
            if('loop' in base){
                mapping.infiniteScroll = base.margin;
            }
            if('responsive' in base && base.responsive.length > 0){
                mapping.responsive = [];
                Object.keys(base.responsive).forEach(key => {
                    let keyParsed = parseInt(key);
                    //Check if is NaN
                    if (!(keyParsed !== keyParsed)) {
                        mapping.responsive.push({
                            breakpoint: key,
                            settings: this._mapOptions(base.responsive[key])
                        });
                    }
                });
            } else {
                base.responsive = false;
            }
            return Object.assign(base, mapping);
        },

        /**
         * It gets the current carousel implementation
         * @returns {*}
         */
        getInstance(){
            return this.slider;
        },
        /**
         * Toggles the play/autoplay state
         * @returns {*}
         */
        play(){
            return $(this.element).slick('slickPlay');//this.getInstance().play();
        },
        /**
         * Toggles the pause state
         * @returns {*}
         */
        pause(){
            return this.getInstance.pause();
        },
        /**
         * Manually skip to slide n
         * @param n
         * @returns {*}
         */
        goToSlide(n){
            return this.getInstance().goToSlide(n);
        },
        /**
         * Refresh/reload the current carousel instance
         * @returns {*}
         */
        refreshInstance(){
            return this.getInstance().refresh();
        },
        /**
         * Destroy the current carousel instance
         * @returns {*}
         */
        destroyInstance(){
            return this.getInstance().destroy();
        },
        /**
         * Rebuild the current carousel instance
         * @returns {*}
         */
        rebuildInstance(){
            return this.getInstance().rebuild();
        },
        /**
         * Retrieves the current carousel instance status
         * @returns {*}
         */
        getInstanceStatus(){
            return this.getInstance().getInfo();
        }
    });
});
