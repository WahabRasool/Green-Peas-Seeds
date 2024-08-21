
const { Engine, Events, Body, Render, Bodies, World, MouseConstraint, Composites, Query, Common, Mouse } = Matter

var sectionTag = document.querySelector(".shapes");

//width and height of the area
let w =  sectionTag.offsetWidth;
let h = sectionTag.offsetHeight;

const engine = Engine.create();

 engine.world.gravity.x = 0  
 engine.world.gravity.y = 0.001 
 engine.world.gravity.scale = 0.1 

    var renderer = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    width: w,
    height: h,
    background: "transparent",
    wireframes: false,
    pixelRatio: window.devicePixelRatio
      }
    });
console.log(window.devicePixelRatio);

// Create a wall for the shapes to bounce off
const wallOptions = {
  isStatic: true,
  render: {
    visible: true,
    fillStyle: "#e572b0",
  },
  friction: 0,
  restitution: 1.1,
}

const ceiling = Bodies.rectangle(w / 2, -1, w, 50, wallOptions)
const ground = Bodies.rectangle(w / 2, h+50, w, 50, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 50, h, wallOptions)
const rightWall = Bodies.rectangle(w+50, h / 2, 50, h, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false
    }
  }
})


  

World.add(engine.world, [
  ground,
  ceiling,
  leftWall,
  rightWall,
 mouseControl,

]);

var color = "#9bc459";

// calculate number of circles based on window size


var peasize = 1225; // 35 * 35, gives some space around the largest pea

var width = window.innerWidth;
var height = window.innerHeight;

var area = width * height;


// we want to cover 85% of the screen in peas 

var areatocover = area * 0.85;
var numberofpeas = areatocover / peasize;


// add peas in random positions

for (let i = 0; i < numberofpeas; i++) {
  var radius = gsap.utils.random(10, 25);
  var radius2 = (radius * 2.5);
var  posx = gsap.utils.random(radius2, w - radius2, radius2, true);
var  posy = gsap.utils.random(radius2, h - radius2, radius2, true);
  
var scaleFactor = radius * -0.013;
  


    World.add(engine.world, Bodies.circle(
      posx(),
      posy(),
      radius, {
       frictionAir: 0,
         frictionStatic: 0,
        friction: 0,
  restitution: 1.01,
      mass: 1,

      slop: 0,
        render: {
          fillStyle: color,
      sprite: {
      texture: "https://assets.codepen.io/588944/pea3.svg",
      xScale: scaleFactor,
      yScale: scaleFactor
      }
        }
      }
    ))
  }


Matter.Runner.run(engine);
Matter.Render.run(renderer);






// resize the area on window resize
window.addEventListener('resize', () => { 

});
window.addEventListener('resize', () => { 
  renderer.bounds.max.x = sectionTag.clientWidth;
  renderer.bounds.max.y = sectionTag.clientHeight;
  renderer.options.width = sectionTag.clientWidth;
  renderer.options.height = sectionTag.clientHeight;
  renderer.canvas.width = sectionTag.clientWidth;
  renderer.canvas.height = sectionTag.clientHeight;
  Matter.Render.setPixelRatio(renderer, window.devicePixelRatio); 

  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(
      sectionTag.clientWidth / 2,
      sectionTag.clientHeight + 50 / 2
    )
  );
  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
      sectionTag.clientWidth + 50 / 2,
      sectionTag.clientHeight / 2
    )
  );
});