define([
    'jquery',
    'collapsible',
    'matchMedia',
    'domReady!',
], function ($) {
    'use strict';
    $.widget('dnafactory.responsiveAccordion',{
        options: {
            maxWidth: '576px'
        },

        _create: function() {
            this._init();
        },
        _init: function () {
            var element = $('.has-accordion');
            var accordionOptions = {
                collapsible: true,
                header: '.accordion-heading',
                trigger: '',
                content: '.accordion-content',
                openedState: 'active',
                animate: false
            };
            var newAccordion = element.collapsible(accordionOptions);
            this._resizeAccordion(newAccordion);
        },
        _resizeAccordion: function (element) {
            let that = this;
            mediaCheck({
                media: '(min-width: '+ that.options.maxWidth +')',
                entry: function() { // mobile
                    var isCollapsible = element.collapsible("option","collapsible");
                    if (!isCollapsible) {
                        element.collapsible('activate');
                    } else {
                        element.find('.accordion-content').css('display', 'block');
                    }

                    element.collapsible('option', 'collapsible', false);
                },
                exit: function() { // desktop
                    element.collapsible('deactivate');
                    element.collapsible('option', 'collapsible', true);
                }
            });
        }
    });
    return $.dnafactory.responsiveAccordion;
});
