sap.ui.define(["ble/saptify/controller/BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("ble.saptify.controller.MainView", {

        onInit: async function () {
            let oModel = this.getOwnerComponent().getModel("charts");
            let aTracks = await this.getTopCharts();
            oModel.setData(aTracks);

        },

        onAfterRendering: function () {
            
        },

        onPressSong: function (oEvent) {
            let oModel  = this.getOwnerComponent().getModel("charts");
            let sPath = oEvent.getSource().getBindingContext("charts").getPath();
            let { track } = oModel.getProperty(sPath);

            window.open(track.uri, '_blank');
        }
    });
});
