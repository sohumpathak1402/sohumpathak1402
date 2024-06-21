const ctx=document.getElementById("board").getContext("2d");
particles=[];

function draw(x,y,colour,size){
	ctx.fillStyle=colour;
	ctx.fillRect(x,y,size,size);
}

function particle(x,y,colour){
	return{"x":x,"y":y,"vx":0,"vy":0,colour:colour};
}

function random(){
	return Math.random()*400+50;
}

function create(num,colour){
	group=[]
	for (let i=0;i<num;i++){
		group.push(particle(random(),random(),colour));
		particles.push(group[i]);
	}
	return group;
}

physics=(set1,set2,mag)=>{
	for (let i=0;i<set1.length;i++){
		fx=0;
		fy=0;
		for (let j=0;j<set2.length;j++){
			a=set1[i];
			b=set2[j];
			dx=a.x-b.x;
			dy=a.y-b.y;
			d=Math.sqrt(dx*dx+dy*dy);
			if (d>0 && d<80){
				f=mag*1/d;
				fx+=(f*dx);
				fy+=(f*dy);
			}
		}
		a.vx=(a.vx+fx)/2;
		a.vy=(a.vy+fy)/2;
		a.x+=a.vx
		a.y+=a.vy
		if (a.x<=50 || a.x>=550){a.vx*=-1}
		if (a.y<=50 || a.y>=550){a.vy*=-1}
	}
}
yellow=create(200,"yellow")
red=create(200,"red")
green=create(200,"green")

update=()=>{
	physics(green,green,-0.32)
	physics(green,red,-0.17)
	physics(green,yellow,0.34)
	physics(red,red,-0.1)
	physics(red,green,-0.34)
	physics(yellow,yellow,0.15)
	physics(yellow,green,-0.2)
	ctx.clearRect(0,0,600,600);
	draw(0,0,"black",600)
	for (let i=0;i<particles.length;i++){
		draw(particles[i].x,particles[i].y,particles[i].colour,5);
	}
	requestAnimationFrame(update);
}
update();





