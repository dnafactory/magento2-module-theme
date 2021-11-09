var config = {
    map: {
        '*': {
            responsiveAccordion: 'DNAFactory_Theme/js/responsive-accordion',
            /* Replace tinySlider with your custom slider instance */
            dnaCarousel: 'swiperCarousel',
        }
    },
    paths:{
        tinySlider: 'DNAFactory_Theme/js/carousels/tiny-slider', /** @deprecated */
        owlCarousel: 'DNAFactory_Theme/js/carousels/owl-carousel', /** @deprecated */
        slickCarousel: 'DNAFactory_Theme/js/carousels/slick-carousel',
        slick: 'DNAFactory_Theme/js/vendor/slick/slick.min',
        swiperCarousel: 'DNAFactory_Theme/js/carousels/swiper-carousel',
        swiper: 'DNAFactory_Theme/js/vendor/swiper/js/swiper-bundle',
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
