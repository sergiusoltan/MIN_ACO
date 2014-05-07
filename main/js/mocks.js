/**
 * Created by ZIG on 02.05.2014.
 */
function mockAnt() {
    var ant = ants[0];
    ant.visited.push(1);
    ant.visited.push(2);
    ant.current = 2;
    getNextCity(ant);
}

function mockMain() {
    mainAlgorithm();
//    draw();
}

function mockTwoOpt(){
    initWave();
    for (var i = 0; i < ants_number; i++) {
        findPath(i);
    }
    TwoOptAlgorithm();
}
