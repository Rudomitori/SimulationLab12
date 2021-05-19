export default class Command{
    name: string;
    goalRate: number;
    goals: number = 0;
    points: number = 0;
    wins: number = 0;
    routs: number = 0;

    constructor(name: string, goalRate: number) {
        this.name = name;
        this.goalRate = goalRate;
    }

    reset () {
        this.goals = 0;
        this.routs = 0;
        this.points = 0;
        this.wins = 0;
    }
}