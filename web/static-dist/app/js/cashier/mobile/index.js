webpackJsonp(["app/js/cashier/mobile/index"],{"0462758757283f323cc5":function(t,i){"use strict";function e(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),a=function(){function t(i){e(this,t),this.$container=i.$coinContainer,this.cashierForm=i.cashierForm,this.$form=i.$form,this.priceType=this.$container.data("priceType"),this.coinRate=this.$container.data("coinRate"),this.maxCoinInput=this.$container.data("maxAllowCoin")>this.$container.data("coinBalance")?this.$container.data("coinBalance"):this.$container.data("maxAllowCoin"),this.initEvent()}return n(t,[{key:"initEvent",value:function(){var t=this;this.$form.on("change",".js-coin-amount",function(i){return t.changeAmount(i)})}},{key:"changeAmount",value:function(t){var i=$(t.currentTarget),e=i.val();if(isNaN(e)||e<=0?(i.val(""),this.removePasswordValidate(),this.$form.trigger("removePriceItem",["coin-price"]),this.cashierForm.calcPayPrice(e)):i.val(parseFloat(e).toFixed(2)),e>this.maxCoinInput&&(e=this.maxCoinInput,i.val(parseFloat(e).toFixed(2))),e>0){this.addPasswordValidate();var n=this.$form.data("coin-name"),a=0;if("coin"===this.priceType){a=parseFloat(e).toFixed(2)+" "+n;var r=parseFloat(this.$container.data("maxAllowCoin")),o=parseFloat(r-e).toFixed(2)+" "+n;this.$form.trigger("changeCoinPrice",[o])}else a="￥"+parseFloat(e/this.coinRate).toFixed(2);this.$form.trigger("addPriceItem",["coin-price",n+Translator.trans("order.create.minus"),a]),this.cashierForm.calcPayPrice(e)}}},{key:"addPasswordValidate",value:function(){this.$container.find('[name="payPassword"]').rules("add","required passwordCheck")}},{key:"removePasswordValidate",value:function(){this.$container.find('[name="payPassword"]').rules("remove","required passwordCheck")}}]),t}();i.default=a},0:function(t,i,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function a(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),o=e("0462758757283f323cc5"),c=n(o),s=e("b334fd7e4c5a19234db2"),u=(n(s),function(){function t(i){a(this,t),this.$container=i,this.validator=this.$container.validate(),this.initEvent(),this.initCoin()}return r(t,[{key:"initCoin",value:function(){var t=$("#coin-use-section");t.length>0&&(this.coin=new c.default(t,this))}},{key:"calcPayPrice",value:function(t){var i=this;$.post(this.$container.data("priceUrl"),{coinAmount:t},function(t){i.$container.find(".js-pay-price").text(t.data)})}},{key:"initEvent",value:function(){this.$container.on("click",".check",function(t){var i=$(t.currentTarget);i.hasClass("active")||i.hasClass("disabled")||(i.addClass("active").siblings().removeClass("active"),$("input[name='payment']").val(i.attr("id")))});var t=this.$container;t.on("click",".js-pay-btn",function(i){t.valid()&&t.submit()})}}]),t}());new u($("#cashier-form"))}});