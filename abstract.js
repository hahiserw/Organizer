/*
 * Abstract for organizer
 */

var World = function() {
	this.events = [];
};

World.prototype.addEvent = function( Event ) {
	return this.events.push( Event ) - 1;
};

World.prototype.delEvent = function( start ) {
	for( var i in this.events ) { // Lame
		if( this.events[i].start === start ) {
			delete this.events[i];
			break;
		}
	}
};

World.prototype.getEvent = function( start ) {
	if( this.events.indexOf( start ) !== -1 ) {
		return this.events[start];
	}
};

World.prototype.getDayEvents = function( time, daysMove ) {
	var day = 24 * 60 * 60 * 1000;
	var start = time - ( time % day );
	if( daysMove )
		start += daysMove * day;
	var e = [];
	for( var i in this.events ) {
		var event = this.events[i];
		if( start < event.start && event.start < start + day )
			e.push( event );
	}
	return e;
};


var Event = function( name, description, start, span, repeat ) {
	this.name = name;
	this.description = description;
	this.start = start;
	this.span = span;
	this.repeat = repeat || 0;
};

Event.prototype.toString = function() {
	return this.start + " (" + this.span + "): " + this.name + " [" + this.description + "]";
};


var Day = function( number, date ) {
	this.number = number;
	this.date = date;
};