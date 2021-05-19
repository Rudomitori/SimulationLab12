export function getPoisson(lambda: number): number{
    let l = Math.exp(-lambda);
    let p = 1;
    let m = -1;

    do{
        m++;
        p *= Math.random();
    } while (p > l);

    return m;
}