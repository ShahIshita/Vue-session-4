function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
   } 

const app = Vue.createApp({
    data() {
        return{
            pHealth: 100,
            mHealth: 100,
            cRound: 0,
            winner: null,
            logmessages: []
        };
    },
    computed: {
        monsterBar() {
            if(this.mHealth < 0) {
                return { width: '0%' };
            }
            return {width: this.mHealth + '%'};
        },
        playerBar(){
            if(this.pHealth < 0) {
                return { width: '0%'};
            }
            return {width: this.pHealth + '%'};
        },
        maySpecialAttack() {
            return this.cRound % 3 !==0;
        }

    },
    watch: {
       pHealth(value) {
          if(value <= 0 && this.mHealth <=0) {
          // A draw
          this.winner = 'draw';
        }else if (value <= 0) {
          // player lost
          this.winner = 'monster';
        }
       },
       mHealth(value) {
           if(value <= 0 && this.pHealth <= 0){
               //A draw
               this.winner = 'draw';   
           }else if (value <= 0) {
               // monster lost
               this.winner = 'player';
           } 

       }
    },
    methods:{
        startGame() {
           this.pHealth = 100;
           this.mHealth = 100;
           this.winner = null;
           this.cRound = 0;
           this.logmessages = [];
        },
        attackMonster() {
            this.cRound++;
           const attackValue = getRandomValue(5, 12) ;
           this.mHealth -= attackValue;
           this.addlog('player', 'attack', attackValue);
           this.attackPlayer();
        },
        attackPlayer() {
            const attackValue =  getRandomValue(8, 15);
            this.pHealth -= attackValue;
            this.addlog('monster', 'attack', attackValue);
        },
        specialAttackMon() {
            this.cRound++;
            const attackValue = getRandomValue(10, 25);
            this.mHealth -= attackValue;
            this.addlog('player', 'attack', attackValue);
            this.attackPlayer();
            
        },
        healplayer() {
            this.cRound++;
           const healValue = getRandomValue(8, 20); 
           if(this.pHealth + healValue > 100) {
              this.pHealth = 100; 
           }else {
           this.pHealth += healValue;
         }
         this.addlog('player', 'heal', attackValue);
         this.attackPlayer();
        },
        surrender() {
           this.winner = 'monster';
        },
        addlog(who, what, value) {
         this.logmessages.unshift({
             actionBy: who,
             actionType: what,
             actionValue: value
         });
        }
    },
});

app.mount('#game')