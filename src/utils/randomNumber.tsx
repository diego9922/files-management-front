type MinMax = {
    min: number;
    max: number;
}

function randomNumber(range?:MinMax): number 
{
    if(range){
        return Math.random() * (range.max - range.min) + range.min;
    }
    return Math.random();
}

export default randomNumber;