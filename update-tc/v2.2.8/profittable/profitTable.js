define(["exports","jquery","lodash","../windows/windows","../websockets/binary_websockets","../viewtransaction/viewTransaction","text!./profitTable.html","datatables","jquery-growl","../common/util","css!./profitTable.css"],function(e,t,a,r,o,n,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var l=p(t),s=p(a),c=p(r),d=p(o),u=p(n),f=p(i);function p(e){return e&&e.__esModule?e:{default:e}}function g(e){var a=(0,l.default)("#"+b.attr("id")+"_processing").css("top","200px").show();w=!0;var t={profit_table:1,description:1,sort:"DESC"};if("string"==typeof e){t.date_from=yearMonthDayToEpoch(e,{utc:!0});var r=Date.UTC(1970,0,1,23,59,59)/1e3;t.date_to=t.date_from+r,b.api().rows().remove(),T=!0}else t.limit=250,(T||e.clear)&&(b.api().rows().remove(),T=!1),t.offset=b.api().column(0).data().length;function o(e){var t=(e.profit_table&&e.profit_table.transactions||[]).map(function(e){var t=(parseFloat(e.sell_price)-parseFloat(e.buy_price)).toFixed(currencyFractionalDigits()),a="<button>View</button>".i18n();try{e.longcode}catch(e){}return[epochToString(e.purchase_time,{utc:!0}),e.transaction_id,e.longcode,formatPrice(e.buy_price,local_storage.get("currency")),epochToString(e.sell_time,{utc:!0}),formatPrice(e.sell_price,local_storage.get("currency")),t,a,e]});b.api().rows.add(t),b.api().draw(),w=!1,a.hide()}d.default.send(t).then(o).catch(function(e){o({}),l.default.growl.error({message:e.message})})}function h(e){var t=e.target,a=(0,l.default)(t);if("BUTTON"===t.tagName&&!a.hasClass("button-disabled")){var r=t.parentElement.parentElement,o=b.api().row(r).data();o=s.default.last(o),a.addClass("button-disabled"),u.default.init(o.contract_id,o.transaction_id).then(function(){return a.removeClass("button-disabled")}).catch(function(e){a.removeClass("button-disabled"),l.default.growl.error({message:e.message})})}}var m=null,b=null,v=null,_=e.init=function(e){e.click(function(){m?m.moveToTop():d.default.cached.authorize().then(y).catch(function(e){l.default.growl.error({message:e.message})})})},w=!1,T=!1,y=function(){(m=c.default.createBlankWindow((0,l.default)("<div/>"),{title:"Profit Table".i18n(),dialogClass:"profitTable",width:800,height:400,destroy:function(){b&&b.DataTable().destroy(!0),m=null},refresh:function(){v.clear(),g({clear:!0})},"data-authorized":"true"})).track({module_id:"profitTable",is_unique:!0,data:null}),(b=(0,l.default)(f.default).i18n()).appendTo(m);var a=(0,l.default)("<div/>").addClass("profit-table-info");b=b.dataTable({data:[],columnDefs:[{targets:6,createdCell:function(e,t){var a=t<0?"red":0<t?"green":"bold";a&&(0,l.default)(e).addClass(a),(0,l.default)(e).attr("data-src",t),e.innerHTML=formatPrice(t,local_storage.get("currency"))}}],info:!1,footerCallback:function(){var e=this.api().column(6).data().reduce(function(e,t){return+e+ +t},0),t="total "+(0<=e?"green":"red");a.html('<span class="title">Total Profit/Loss<span><span class="'+t+'">'+formatPrice(e,local_storage.get("currency"))+"</span>")},paging:!1,ordering:!1,searching:!0,processing:!0}),a.i18n().appendTo(b.parent()),b.parent().addClass("hide-search-input"),b.api().columns().every(function(){var e=this;(0,l.default)("input",this.header()).on("keyup change",function(){e.search()!==this.value&&e.search(this.value).draw()})}),g({clear:!0}),v=m.addDateToHeader({title:"Jump to: ".i18n(),date:null,changed:g,cleared:g}),m.dialog("open"),m.on("click",h),m.scroll(function(){.75<(m.scrollTop()+m.innerHeight())/m[0].scrollHeight&&!w&&!T&&g({clear:!1})})};e.default={init:_}});