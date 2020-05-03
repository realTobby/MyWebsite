var rq = '//api.syfaro.net/server/status';
var error = 'unknown';
var classes = {
	error: "fa-question",
	false: "fa-times",
	true: "fa-check",
};
var allclasses = "";
for(i in classes) {
	allclasses += ' '+classes[i];
};

function q(addr, cb) {
	$.ajax({
		url: rq,
		type: 'GET',
		dataType: 'json',
		data: {ip: addr, players: true},
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		cb(data);
	})
	.fail(function(data) {
		console.log("error");
	})
	.always(function() {
	});
}
function setclass(o, c) {
	o.removeClass(allclasses);
	o.addClass(classes[c]);
	o.html('');
}
function settext(o, t) {
	o.removeClass(allclasses);
	o.html(t);
}
function display(data) {
	var np = $('#numplayers'),
		version = $('#version'),
		online = $('#online'),
		motd = $('#motd'),
        players = $('#players');
    data.online = data.status === 'success';

	setclass(online, data.online);
    if (data.online) {
        settext(np, data.players.now);
	    settext(version, data.server.name);
	    settext(motd, data.motd);
        if (data.players.sample) {
            settext(players,
                data.players.sample.map(function(v){
                    return v.name;
                }).join(', '));
        } else {
            settext(players, '');
        }
    } else {
        setclass(np, error);
        setclass(version, error);
        setclass(motd, error);
        setclass(players, error);
    }
}
$(document).ready(function() {
	q('88.214.56.216', display);
});