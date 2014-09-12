enchant();


// グローバル変数
var game;
var scene;
var man;
var cards = [];
var cardsGroup = new Group();
var openedCard;
var correctNum = 0;
var lifeGage;

// 定数
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 480;
var CARD_WIDTH = 60;
var CARD_HEIGHT = 73;
var CARD_NUM = 8;
var MAN_WIDTH = 460;
var MAN_HEIGHT = 257;
var MAX_LIFE = 20;

var cardStatus = {
  close: 0,
  action: 1,
  open: 2,
  finish: 3
};


/********************************
 クラス定義
 ********************************/
/*
 * 基本カードクラス
 */
Card = Class.create(Sprite, {
  // コンストラクタ
  initialize: function (x, y) {
    Sprite.call(this, CARD_WIDTH, CARD_HEIGHT);
    this.image = game.assets['img/cards.png'];
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.fps = 30;
    this.status = cardStatus.close;
    this.num = 0;
  },

  // カードめくる
  open: function () {
    this.frame = this.num;
    this.status = cardStatus.open;
  },

  // カード閉じる
  close: function () {
    this.frame = 0;
    this.status = cardStatus.close;
  },

  // タッチスタートイベント
  ontouchstart: function (e) {
    switch (this.status) {
    case cardStatus.close:
      this.tl.scaled;
      this.open();
      man.actionFlg = true;
      break;
    default:
      break;
    }
  },

  // タッチエンドイベント
  ontouchend: function (e) {
    if (this.status === cardStatus.open) {
      judge(this);
      man.actionFlg = false;
    }
  },

  // フレームイベント
  onenterframe: function (e) {
    //        if (this.vibration)
    //        {
    //            if (game.frame % 2 == 0) {
    //                this.moveTo(this.x, this.y - 10);
    //            }
    //            else {
    //                this.moveTo(this.x, this.y + 10);
    //            }
    //        }
  }
});


/*
 * 人クラス
 */
Man = Class.create(Sprite, {
  // コンストラクタ
  initialize: function (x, y) {
    Sprite.call(this, MAN_WIDTH, MAN_HEIGHT);
    this.image = game.assets['img/esper00.png'];
    this.fps = 15;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.actionFlg = false;
  },

  // フレームイベント
  onenterframe: function (e) {
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



/********************************
 メイン処理
 ********************************/
window.onload = function () {
  //
  game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
  scene = game.rootScene;

  //
  game.fps = 30;
  game.preload('img/kabe.png'
               , 'img/table.png'
               , 'img/cards.png'
               , 'img/esper00.png'
               , 'img/esper01.png'
               , 'img/esper02.png'
               , 'img/esper03.png'
               , 'img/esper04.png'
               , 'img/bar.png');
  game.onload = function () {
    //
    var bg1 = new Sprite(game.width, game.height);
    var bg2 = new Sprite(game.width, game.height);
    man = new Man(150, 50);

    // 背景色と背景画像のセット
    scene.backgroundColor = "lightgray";
    bg1.image = game.assets['img/kabe.png'];
    bg2.image = game.assets['img/table.png'];


    // ライフゲージ
    lifeGage = new LifeLabel(32, 32, MAX_LIFE);
    lifeGage.life = MAX_LIFE;
    //        var score = new ScoreLabel(32, 54);

    // 画面表示（後から指定した方が上に重なる）
    scene.addChild(bg1);
    scene.addChild(man);
    scene.addChild(bg2);
    scene.addChild(lifeGage);
    //        scene.addChild(score);

    // カードの初期化
    initCards();
  }

  game.start();
};



/********************************
 関数
 ********************************/
// カードの初期化
function initCards() {
  var num;
  var index;

  // カード生成
  for (var i = 0; i < CARD_NUM; i++) {
    num = 1 + Math.floor(i / 2);
    do {
      index = rand(CARD_NUM);
    } while (typeof cards[index] !== 'undefined');
    var card = new Card(0, 0);
    card.x = (card.width + 20) * index;
    cards[index] = card;
    cards[index].num = num;
    cardsGroup.addChild(cards[index]);

    //
    console.log("i=" + i + "/num=" + cards[index].num + "/index=" + index);
  }
  cardsGroup.x = 80;
  cardsGroup.y = 320;
  scene.addChild(cardsGroup);
};




// カード判定
function judge(card) {
  if (typeof openedCard === 'undefined') {
    // 1枚目
    openedCard = card;
  } else {
    // 2枚目
    if (openedCard.num == card.num) {
      openedCard.status = cardStatus.finish;
      card.status = cardStatus.finish;
      correctNum++;
      if (correctNum == CARD_NUM / 2) {
        alert("your score is ..");
      }
    } else {
      lifeGage.life -= 2;
      console.log("life=" + lifeGage.life);
      openedCard.close();
      card.close();

      if (lifeGage.life < 1)
        alert("Game Over!")
    }

    openedCard = undefined;
  }
}
