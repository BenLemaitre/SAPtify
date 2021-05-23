sap.ui.define(["ble/saptify/controller/BaseController", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ble.saptify.controller.MainView", {

        onInit: async function () {
            let aTracks = await this._getTopCharts();
            let oNewReleases = await this._getNewReleases();
            let oTopArtists = await this._getTopArtists();
            
            this.setModel(new JSONModel(aTracks), "charts");
            this.setModel(new JSONModel(oNewReleases), "releases");
            this.setModel(new JSONModel(oTopArtists), "topArtists");

            // TODO: Create view model for view settings
        },

        /*-------------------*/
        /*      Events       */
        /*-------------------*/
        onPressSong: function (oEvent) {
            let oModel  = this.getModel("charts");
            let sPath = oEvent.getSource().getBindingContext("charts").getPath();
            let { track } = oModel.getProperty(sPath);

            window.open(track.uri, '_blank');
        },

        onPressNewRelease: function (oEvent) {
            let oModel  = this.getModel("releases");
            let sPath = oEvent.getSource().getBindingContext("releases").getPath();
            let sAlbumId = oModel.getProperty(`${sPath}/id`);

            debugger;
            // TODO: Redirect to new view (list of the album's song);
        },

        onPressTopArtist: function (oEvent) {
            let oModel  = this.getModel("topArtists");
            let sPath = oEvent.getSource().getBindingContext("topArtists").getPath();
            let sAlbumId = oModel.getProperty(`${sPath}/id`);

            debugger;
            // TODO: Redirect to new view (list of Artist's best songs);
        },

        /*-------------------*/
        /*  Private methods  */
        /*-------------------*/
        _getTopCharts: async function () {
            try {
                // Top 50 songs playlist ID: 37i9dQZEVXbNG2KDcFcKOF
                const res = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF?market=US", {
                    headers: this.getHeaders()
                });
                const {tracks} = await res.json();

                return tracks;
            } catch (error) {
                console.log(error);
            }
        },
        
        _getNewReleases: async function () {
            try {
                const res = await fetch("https://api.spotify.com/v1/browse/new-releases?country=US&limit=5", {
                    headers: this.getHeaders()
                });
                const { albums } = await res.json();

                return albums;
            } catch (error) {
                console.log(error);
            }
        },

        _getTopArtists: async function () {
            try {
                // Nujabes (3Rq3YOF9YG9YfCWD4D56RZ) related artists
                const res = await fetch("https://api.spotify.com/v1/artists/3Rq3YOF9YG9YfCWD4D56RZ/related-artists", {
                    headers: this.getHeaders()
                });
                const { artists } = await res.json();
                
                return artists;
            } catch (error) {
                console.log(error);
            }
        }


    });
});
