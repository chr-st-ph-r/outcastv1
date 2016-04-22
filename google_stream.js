'use strict'
function GoogleStream( obj ) {
    Stream.call( this, obj );
    this.api = obj.api || "";
    this.v = obj.v || "";
}

GoogleStream.prototype = Object.create(Stream.prototype);

GoogleStream.prototype.callApi = function() {
    console.log( "calling api" );
    console.log( gapi );
    gapi.client.setApiKey( this.key );
    setTimeout($.proxy(this.checkAuth, this), 1);
}

GoogleStream.prototype.handleAuthRequest = function( event ) {
    console.log( "handling auth request");
    gapi.auth.authorize( {client_id: this.clientID, scope: this.scope, immediate: false}, $.proxy( this.handleAuthResult ) );
}

GoogleStream.prototype.checkAuth = function( event ) {
    console.log( "checking auth request");
    console.log("this " + this);
    console.log("self " + this.clientID);
    //console.log(this.scope);
    gapi.auth.authorize( {client_id: this.clientID, scope: this.scope, immediate: true}, $.proxy(this.handleAuthResult, this) );
}

GoogleStream.prototype.fetch = function( callback ) {
    console.log( "Calling Google " + this.api + " API" );
    $.proxy(gapi.client.load( this.api, this.v ).then( callback ), this);
}

GoogleStream.prototype.handleAuthResult = function( authResult ) {
    console.log( "handling auth result");
    if ( authResult && !authResult.error ) {
        console.log( this );
        var handler = this.handleDrive;
        console.log(handler);
        this.fetch( $.proxy(this.handleDrive, this) );
    } else {
        this.handleAuthRequest();
    }
}

GoogleStream.prototype.handleDrive = function() {
    var request = gapi.client.drive.files.list();
    console.log( request );
    console.log( this );
    $.proxy(request.then( $.proxy(function( resp ) {
        var items = resp.result.items;
        for (var i = 0; i < items.length; i++) {
         this.inflow[i] = ( items[i] );

        }
    }, this)), this);
}

GoogleStream.prototype.init = function() {
    this.callApi();
}