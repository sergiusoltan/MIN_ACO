/**
 * Created by ZIG on 26.04.2014.
 */
drawCities = function () {
    cities.forEach(function (c,index) {
        main_context.fillStyle = "rgb(100, 200, 250)";
        main_context.beginPath();
        main_context.arc(c.x, c.y, 10, 0, 2 * Math.PI, false);
        main_context.fill();

        main_context.fillStyle = 'black';
        main_context.font="15px Times Roman";
        main_context.fillText(""+index, c.x-5, c.y+5);
    });
}
clearMain = function () {
    main_context.clearRect(0, 0, width, height);
    fitness_context.clearRect(0, 0, width, height);
}
drawEdges = function () {
    var drawn = [];
    cities.forEach(function (city,i) {
        /* For each city in the particle*/
        cities.forEach(function (to,j) {
            if(!drawn.contains(i+""+j)){
                var alpha = edge_pheromones[i][j];
                main_context.beginPath();
                main_context.strokeStyle = "rgba(200, 0, 0, " + alpha + ")";
                main_context.moveTo(city.x, city.y);
                main_context.lineTo(to.x, to.y);
                main_context.stroke();

                drawn.push(i+""+j);
                drawn.push(j+""+i);
            }
        });
    });
}
drawFitness = function () {
    var height = fitness_height / 50;


    BEST_PATHS.forEach(function(d,index){
        fitness_context.beginPath();
        fitness_context.fillStyle = "rgb(100, 200, 250)";
        fitness_context.moveTo(0, height * index);
//        var width = d * 20 / fitness_width;
        var width = (d / fitness_width * 30);
        fitness_context.lineTo(width, height * index);
        fitness_context.stroke();

        fitness_context.fillStyle = 'black';
        fitness_context.font="10px Times Roman";
        fitness_context.fillText(""+d, 0, (height *index - 3));
    });
}

drawWaveFitness = function () {
    var height = fitness_height / ants_number;
    var results = [];

    ants.forEach(function(ant,index){
        fitness_context.beginPath();
        fitness_context.strokeStyle = "rgb(250, 50, 50)";
        fitness_context.moveTo(0, height * index);
        var d = ant.path.calculatePathDistance();
        results.push(d);
        var width = (d / fitness_width * 30);
        fitness_context.lineTo(width ,height * index);
        fitness_context.stroke();

        fitness_context.fillStyle = 'black';
        fitness_context.font="10px Times Roman";
        fitness_context.fillText(""+d, 0, (height *index -3));
    });

    if(!BEST_RESULT){
        return;
    }
    fitness_context.beginPath();
    fitness_context.strokeStyle = "black";
    var bd = BEST_RESULT.distance / fitness_width * 30;
    fitness_context.moveTo(bd,0);
    fitness_context.lineTo(bd,fitness_height);
    fitness_context.stroke();

    var sameResult = results.countSame(BEST_RESULT.distance);
    fitness_context.fillStyle = 'blue';
    fitness_context.font="20px Times Roman";
    fitness_context.fillText(""+sameResult, bd + 5,fitness_height);
}