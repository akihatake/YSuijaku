enchant();


// グローバル変数
var game;
var scene;
var man;
var cards = new Array();
var cardsGroup = new Group();

// 定数
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 480;
var CARD_WIDTH = 60;
var CARD_HEIGHT = 73;
var CARD_NUM = 8;
var MAN_WIDTH = 460;
var MAN_HEIGHT = 257;

var cardStatus = {
    close: 0,
    action: 1,
    open: 2,
}

//
// 乱数生成
//
function rand(n) {
    return Math.floor(Math.random() * (n + 1));
}


/********************************
 ゲーム内の要素をクラス定義
 ********************************/
//
// 基本カードクラス
//
// 　共通する状態フラグだったりイベント処理を定義して、必要であれば
// 　これを継承してカードオブジェクトを作る
var Card = Class.create(Sprite, {
    // コンストラクタ
    initialize: function(x, y) {
        Sprite.call(this, CARD_WIDTH, CARD_HEIGHT);
        this.image = game.assets['img/card_ura.png'];
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.fps = 30;
        this.status = cardStatus.close;

        this.num = 0;
        this.origX = x;
        this.origY = y;
        this.vibration = false;
    },

    // タッチスタートイベント
    ontouchstart: function(e) {
        switch(this.status) {
            case cardStatus.close:
                this.visible = false;
                man.actionFlg = true;
                this.status = cardStatus.action;
                break;
            case cardStatus.open:
                this.status = cardStatus.close;
                this.image = game.assets['img/card_ura.png'];
                break;
            default:
                break;
        }
    },

    // タッチエンドイベント
    ontouchend: function(e) { 
        this.visible = true;
        man.actionFlg = false;

        switch(this.status) {
            case cardStatus.action:
                this.status = cardStatus.open;
                this.image = game.assets['img/card00.png'];
                break;
            default:
                break;
        }
    },

    // フレームイベント
    onenterframe: function(e) {
        if (this.vibration)
        {
            if (game.frame % 2 == 0) {
                this.moveTo(this.x, this.y - 10);
            }
            else {
                this.moveTo(this.x, this.y + 10);
            }
        }
    }
});


//
// 人クラス
//
// 　カードをめくった時にアニメーションさせたりします
var Man = Class.create(Sprite, {
    // コンストラクタ
    initialize: function(x, y) {
        Sprite.call(this, MAN_WIDTH, MAN_HEIGHT);
        this.image = game.assets['img/esper00.png'];
        this.fps = 15;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.actionFlg = false;
    },

    // フレームイベント
    onenterframe: function(e) {
//            console.log("現在のフレーム：" + (game.frame % 2));
        if (this.actionFlg) {
            /* アニメーションで人を動かす処理を書きます。 */
            switch (game.frame % 4) {
                case 0:
                    this.image = game.assets['img/esper01.png'];
                    break;
                case 1:
                    this.image = game.assets['img/esper02.png'];
                    break;
                case 2:
                    this.image = game.assets['img/esper03.png'];
                    break;
                case 3:
                    this.image = game.assets['img/esper04.png'];
                    break;
                default:
                    this.image = game.assets['img/esper00.png'];
                    break;
            }
        } else {
            this.image = game.assets['img/esper00.png'];
        }
    }

});


//
// メータークラス
//
// 　はずれるとメーターがどんどん上がる
var Meter = Class.create(Sprite, {
    // コンストラクタ
    initialize: function(x, y) {

    },

    // フレームイベント
    onenterframe: function(e) {

    }

});
    



// メイン処理
window.onload = function () {
    //
    game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
    scene = game.rootScene;

    //
    game.fps = 15;
    game.preload('img/kabe.png'
                 , 'img/table.png'
                 , 'img/card_ura.png'
                 , 'img/esper00.png'
                 , 'img/esper01.png'
                 , 'img/esper02.png'
                 , 'img/esper03.png'
                 , 'img/esper04.png'
                 , 'img/card00.png'
                 , 'img/card01.png'
                );
    game.onload = function () {
        //
        var bg1 = new Sprite(game.width, game.height);
        var bg2 = new Sprite(game.width, game.height);
        man = new Man(150, 50);

        // 背景色と背景画像のセット
        scene.backgroundColor = "lightgray";
        bg1.image = game.assets['img/kabe.png'];
        bg2.image = game.assets['img/table.png'];

		// 画面表示（後から指定した方が上に重なる）
        scene.addChild(bg1);
        scene.addChild(man);
        scene.addChild(bg2);

        
        initCards();
    }

    game.start();
};



// カードの初期化
function initCards() {
	var num;
    var cardIndex;
    
    // カード生成
    for (var i = 0; i < CARD_NUM; i++) {
//        num = Math.floor(i / 2);
//        do {
//	        cardIndex = Math.floor(Math.random() * CARD_NUM);
//        } while(cards[cardIndex] != undefined);
        cards[i] = new Card((CARD_WIDTH + 20) * i, 0);
        cards[i].num = Math.floor(i / 2);

        console.log("i=" + i);
        console.log("num=" + cards[i].num);

        cardsGroup.addChild(cards[i]);
    }
    cardsGroup.x = 80;
    cardsGroup.y = 320;
    scene.addChild(cardsGroup);
};
