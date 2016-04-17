/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy
// module.exports ==> exports
exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
	console.log("newGame");
    var newGame = function () {
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        req.session.puzzle.data = data;
        return {
            "retMsg": "Rozpoczęto grę"
        };
    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    /*
     * req.params[2] === wartość size
     * req.params[4] === wartość dim
     * req.params[6] === wartość max
     */
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
	if (req.params[4]) {
        req.session.puzzle.dim = req.params[4];
    }
    if (req.params[6]) {
        req.session.puzzle.max = req.params[6];
    }
    res.json(newGame());
};

exports.mark = function (req, res) {
	console.log("markAnswer");
    var markAnswer = function () {
		var tablicatymczasowa = [];
		var trafienieidealne = 0;
		var trafieniezprzesunieciem = 0;
		var wygrana = false;
        var move = req.params[0].split('/');
        move = move.slice(0, move.length - 1);
        console.log(move);
		
		for(var i = 0; i < move.length; i++){
            if(move[i] == tablicatymczasowa[i]){
                trafienieidealne++;
                tablicatymczasowa[i] = -1;
                move[i] = -2;
            }
        }
		
        for(var i = 0; i < move.length; i++){
            for(var j = 0; j < move.length; j++){
                if(move[j] == tablicatymczasowa[i]){
                    tablicatymczasowa[i] = -3;
                    move[j] = -4;
                    trafieniezprzesunieciem++;
                }
            }
        }
		
		if(trafienieidealne == move.length){
            wygrana = true;
        } 
		
        return {
            "retVal": {"Idealne trafienia": trafienieidealne, "Trafienia z przesunięciem": trafieniezprzesunieciem},
            "retMsg": "GRATULACJE !!"
        };
    };
    res.json(markAnswer());
};
