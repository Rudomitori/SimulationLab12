import Command from "./Command";
import {getPoisson} from "./PoissonDistribution";

export default class Match {
    commands: [Command, Command];
    isPlayed: boolean = false;
    winner?: Command | null = null;
    goals: [number, number] = [0, 0];

    constructor(commands: [Command, Command]) {
        this.commands = commands;
    }

    play() {
        this.goals = [
            getPoisson(this.commands[0].goalRate),
            getPoisson(this.commands[1].goalRate)
        ];

        if (this.goals[0] > this.goals[1]) {
            this.winner = this.commands[0];
        }
        else if (this.goals[0] < this.goals[1]) {
            this.winner = this.commands[1];
        }
        else this.winner = null;

        for (let i of [0, 1]){
            this.commands[i].goals += this.goals[i];
        }

        this.isPlayed = true;
    }

    reset() {
        this.winner = undefined;
        this.goals = [0, 0];
        this.isPlayed = false;
    }
}