enchant();

window.onload = function () {
    //
    game = new Game(800, 480);
    scene = game.rootScene;

    //
    game.fps = 30;
    game.preload(
                 'img/face_tate.png'
                 , 'img/face_yoko.png'
                 , 'img/face_2col.png'
                );
    game.onload = function () {
    	
        var tate = new Sprite(100, 100);
        tate.image = game.assets['img/face_tate.png'];
        tate.x = 100;
        tate.y = 100;
        tate.frame = 0;
        tate.fps = 30;
        game.rootScene.addChild(tate);
        tate.addEventListener('enterframe', function(e) {
			if (tate.frame > 3)
                tate.frame = 0;
            tate.frame++;
        });
        var yoko = new Sprite(100, 100);
        yoko.image = game.assets['img/face_tate.png'];
        yoko.x = 600;
        yoko.y = 100;
        yoko.frame = 0;
        yoko.fps = 30;
        game.rootScene.addChild(yoko);
        yoko.addEventListener('enterframe', function(e) {
			if (yoko.frame > 3)
                yoko.frame = 0;
            yoko.frame++;
        });
        var tateyoko = new Sprite(100, 100);
        tateyoko.image = game.assets['img/face_2col.png'];
        tateyoko.x = 300;
        tateyoko.y = 300;
        tateyoko.frame = 0;
        tateyoko.fps = 10;
        game.rootScene.addChild(tateyoko);
        tateyoko.addEventListener('enterframe', function(e) {
			if (tateyoko.frame > 7)
                tateyoko.frame = 0;
            tateyoko.frame++;
            console.log(game.fps + '/' + tateyoko.frame);
        });

    }

    game.start();
};


