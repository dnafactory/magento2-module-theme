/**
 * @see Magento_Theme/js/view/messages.js
 */
define([
    'Magento_Theme/js/view/messages',
    'ko'
], function (Component, ko) {
    'use strict';

    return Component.extend({
        defaults: {
            baseMessages: ko.observableArray([
                { type: "success", text: "<b>Success:</b> Successfully updated deleted <a href='#'>the selected</a> credit card" },
                { type: "error", text: "<b>Error:</b> Your coupon could not be processed at this time. Please <a href='#'>try again</a> later" },
                { type: "warning", text: "<b>Warning:</b> You have <a href='#'>things</a> that need your immediate attention" },
                { type: "info", text: "<b>Info:</b> Welcome back <a href='#'>Ciro!</a>" },
                { type: "notice", text: "<b>Notice:</b> Presto disponibile! <a href='#'>Contattaci</a>." },
            ])
        },

        initialize: function(){
            this._super();

            this.messages = ko.computed(function(){
                return {
                    messages: this.baseMessages()
                }
            }, this);
        }
    });
});
