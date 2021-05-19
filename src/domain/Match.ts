import Command from "./Command";
import {getPoisson} from "./PoissonDistribution";

export default class Match {
    commands: [Command, Command];
    isFinished: boolean = false;
    winner?: Command | null = null;
    goals: [number, number] = [0, 0];
    progress: number = 0;

    constructor(commands: [Command, Command]) {
        this.commands = commands;
    }

    play(time: number) {
        let t = Math.min(time, 1 - this.progress);

        this.goals = [
            this.goals[0] + getPoisson(this.commands[0].goalRate * t),
            this.goals[1] + getPoisson(this.commands[1].goalRate * t)
        ];

        this.progress += t;

        if(this.progress > 0.999){
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

            this.isFinished = true;
        }
    }

    reset() {
        this.winner = undefined;
        this.goals = [0, 0];
        this.isFinished = false;
        this.progress = 0;
    }
}