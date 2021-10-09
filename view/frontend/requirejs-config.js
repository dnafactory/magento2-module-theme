var config = {
    map: {
        '*': {
            /*dnaQtyController: 'DNAFactory_Theme/js/quantity-controller',*/
            responsiveAccordion: 'DNAFactory_Theme/js/responsive-accordion',
            dnaCarousel: 'DNAFactory_Theme/js/dna-carousel',
            /* Replace tinySlider with your custom slider instance */
            dnaCarouselInstance: 'tinySlider',
        }
    },
    paths:{
        tinySlider: 'DNAFactory_Theme/js/carousels/tiny-slider',
        owlCarousel: 'DNAFactory_Theme/js/carousels/owl-carousel',
        slickCarousel: 'DNAFactory_Theme/js/carousels/slick-carousel',
        slick: 'DNAFactory_Theme/js/vendor/slick/slick.min'
    },
    config: {
        mixins: {
            'DNAFactory_Theme/js/carousels/tiny-slider':{
                'DNAFactory_Theme/js/carousels/tiny-slider-flexbox-mixin': true
            },
            "mage/sticky":{
                "DNAFactory_Theme/js/mixins/sticky-mixin": true
            }
        }
    }
};
