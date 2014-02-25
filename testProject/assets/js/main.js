!function(io) {

    var socket = io.connect('http://localhost:1337');

    socket.on('connect', function() {

        socket.request('/foo', {}, function(foos) {
            console.log(foos);
        });

        socket.on('message', function(message) {
            console.log("message", message);
        });

    });

}(io)