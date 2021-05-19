import Command from "./Command";
import Match from "./Match";

export default class GameManager {
    commands: Command[];
    gameState: GameState = GameState.notStarted;
    matches: Match[];
    matchPlayed: number = 0;
    private interval?: NodeJS.Timeout;

    constructor(commands: { name: string, rate?: number }[]) {
        this.commands = [];

        for (let command of commands) {
            let rate: number;
            if (command.rate === undefined) {
                rate = Math.random() * 5;
            } else rate = command.rate;
            this.commands.push(new Command(command.name, rate));
        }

        this.matches = [];
        for (let tuple of combine(this.commands, 2)){
            this.matches.push(new Match(tuple as [Command, Command]));
        }

        shuffle(this.matches);
    }

    start(){
        if (this.gameState === GameState.finished){
            this.reset();
        }
        this.gameState = GameState.started;

        this.interval = setInterval(() => {
            this.playMatch(0.1);
        }, 100);
    }

    stop(){
        this.gameState = GameState.stopped
        if(this.interval !== undefined){
            clearInterval(this.interval);
        }
    }

    reset(){
        for(let command of this.commands)
            command.reset();

        for(let match of this.matches)
            match.reset();

        this.matchPlayed = 0;
        this.gameState = GameState.notStarted;
    }

    playMatch(time:number) {
        let match = this.matches[this.matchPlayed];
        match.play(time);

        if(match.isFinished) {
            if (match.winner instanceof Command) {
                match.winner.wins++;
                match.winner.points += 2;
                if (match.commands[0] == match.winner)
                    match.commands[1].routs++;
                else
                    match.commands[0].routs++;
            }
            else {
                for (let command of match.commands)
                    command.points += 1;
            }

            this.matchPlayed++;
            if (this.matchPlayed == this.matches.length) {
                this.gameState = GameState.finished;

                if(this.interval !== undefined) {
                    clearInterval(this.interval);
                }
            }
        }
    }
}

export enum GameState {
    notStarted,
    started,
    stopped,
    finished
}

function shuffle<T>(array: Array<T>) {
    let i = array.length;
    let temp: T;
    let randomI: number;

    while (i > 0) {
        randomI = Math.floor(Math.random() * i);
        i--;

        temp = array[i];
        array[i] = array[randomI];
        array[randomI] = temp;
    }
}

/*
 * @param arr {Array<T>} Набор элементов
 * @param k {number} Размер сочетания
 * @return Все сочетания
 */
function combine<T>(arr: Array<T>, k: number): Array<[...T[]]>{
    let result: Array<[...T[]]> = [];
    let current: [...T[]] = [];

    function recursion(start: number, i: number){
        if (i === k) {
            result.push([...current]);
            return;
        }

        for (let j = start; j < arr.length; j++) {
            current[i] = arr[j];
            recursion(j+1, i+1);
        }
    }
    recursion(0, 0);
    return result;
}
