class GameRules {
    constructor(moves) {
      this.moves = moves;
      this.rules = this.createRules();
    }
  
    createRules() {
      const rules = {};
      const n = this.moves.length;
  
      for (let i = 0; i < n; i++) {
        rules[this.moves[i]] = {};
        for (let j = 0; j < n; j++) {
          if (i === j) {
            rules[this.moves[i]][this.moves[j]] = 'Draw';
          } else if ((i + Math.floor(n / 2)) % n === j) {
            rules[this.moves[i]][this.moves[j]] = 'Win';
          } else {
            rules[this.moves[i]][this.moves[j]] = 'Lose';
          }
        }
      }
      return rules;
    }
  
    determineOutcome(playerMove, computerMove) {
      return this.rules[playerMove][computerMove];
    }
  }
  
  module.exports = GameRules;
  