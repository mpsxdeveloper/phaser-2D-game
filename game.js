const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 500,
    parent: 'game',
    backgroundColor: '#CCCCFF',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const MAX_RIGHT = 500
const MIN_LEFT = 100
const VELOCITY = 15
let increase = 0

const game = new Phaser.Game(config)

function preload() {
    this.load.image('player', 'assets/ball_blue_small.png')
    this.load.image('yellow_block', 'assets/block_locked_small.png')
    this.load.image('green_block', 'assets/block_small.png')
}

function create() {
    score = 0
    running = false
    platforms = this.physics.add.group({
        immovable: true,
        allowGravity: false
    })
    block_small = this.add.sprite(300, 32, 'green_block').setOrigin(0, 0)
    platform_green1 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 100, 'green_block').setOrigin(0, 0)
    platform_yellow1 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 175, 'yellow_block').setOrigin(0, 0)
    platform_green2 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 250, 'green_block').setOrigin(0, 0)
    platform_yellow2 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 325, 'yellow_block').setOrigin(0, 0)
    platform_green3 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 400, 'green_block').setOrigin(0, 0)
    platform_yellow3 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 475, 'yellow_block').setOrigin(0, 0)
    platform_green4 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 550, 'green_block').setOrigin(0, 0)
    platform_yellow4 = this.add.sprite(Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT), 625, 'yellow_block').setOrigin(0, 0)
    platforms.add(platform_green1)
    platforms.add(platform_yellow1)
    platforms.add(platform_green2)
    platforms.add(platform_yellow2)
    platforms.add(platform_green3)
    platforms.add(platform_yellow3)
    platforms.add(platform_green4)
    platforms.add(platform_yellow4)
    score_text = this.add.text(5, 5, "Score: " + score, {fontSize: 38, color: "#000000", fontStyle: "bold"})
    information_text = this.add.text(200, 210, "READY?", {fontSize: 58, color: "#000000", fontStyle: "bold italic"})
    player = this.physics.add.sprite(300, 1, 'player').setOrigin(0, 0)
    player.body.setAllowGravity(false)
    player.setBounce(1)
    player.setCollideWorldBounds(true)
    this.physics.add.collider(player, platforms)
    cursors = this.input.keyboard.createCursorKeys()
    this.loopEvent = this.time.addEvent({ delay: 500, callback: onLoopEvent, callbackScope: this, loop: true })    
    this.startEvent = this.time.addEvent({ delay: 3000, callback: onStartEvent, callbackScope: this, loop: false })    
}

function update() {
    if(running) {
        if(cursors.left.isDown) {
            player.setVelocityX(-70)            
        }
        else if(cursors.right.isDown) {
            player.setVelocityX(70)
        }
        if(player.y > 500 - (player.height + 1)) {
            player.body.stop()
            running = false
            player.setBounce(0)
            player.tint = 0xff0000
            information_text.setText("GAME OVER").setFontSize(58).setFontStyle("bold italic").setColor("#ff0000").setX(150).setTint(0xff00ff, 0xffff00, 0x00ff00, 0xff0000)
        }
    }     
}

function onLoopEvent() {
    if(running) {
        score += 1
        score_text.text = "Score: " + score
        Phaser.Actions.Call(platforms.getChildren(), function(platform) {
            platform.y = platform.y - (VELOCITY + increase)
            if(platform.y < -platform.height) {
                platform.x = Phaser.Math.RND.between(MIN_LEFT, MAX_RIGHT)
                platform.y = 500 + platform.height
            }
        }, this)
        if(score % 50 === 0) {
            increase += 1
        }        
    }    
}

function onStartEvent() {
    information_text.text = ""
    block_small.destroy()
    running = true
    player.body.setAllowGravity(true)
}