const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade' },
    scene: { preload, create, update }
};

let player;
let bullets;
let badges;
let cursors;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'); // 玩家（替換成角色圖片）
    this.load.image('badge', 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'); // 標章（替換成標章圖片）
    this.load.image('bullet', 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'); // 子彈
}

function create() {
    player = this.physics.add.image(config.width / 2, config.height - 50, 'player').setCollideWorldBounds(true);

    bullets = this.physics.add.group();
    badges = this.physics.add.group({
        key: 'badge',
        repeat: 5,
        setXY: { x: 50, y: 50, stepX: 100 }
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.input.on('pointermove', function (pointer) {
        player.x = pointer.x;
    });

    this.input.on('pointerdown', function () {
        let bullet = bullets.create(player.x, player.y - 20, 'bullet');
        bullet.setVelocityY(-300);
    });

    this.physics.add.overlap(bullets, badges, hitBadge, null, this);

    scoreText = this.add.text(10, 10, '分數: 0', { fontSize: '20px', fill: '#000' });
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        player.setVelocityX(300);
    } else {
        player.setVelocityX(0);
    }
}

function hitBadge(bullet, badge) {
    bullet.destroy();
    badge.destroy();
    score += 10;
    scoreText.setText('分數: ' + score);
}
