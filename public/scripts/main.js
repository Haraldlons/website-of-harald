class Person{
	constructor(name){
		this.name = name;
	}
	hello(){
		if(typeof this.name === "string"){
			return "Hello, I am " + this.name + "!";
		}else {
			return "Hello!";
		}
	}
}

var person = new Person("Harald Igjen Halla")
var greetHTML = templates['greeting']({
	message: person.hello()
})

var godbyeMessage = templates['godbye']({
	message: "THIS IS A MESSAGE FROM main.js"
})

// document.write(person.hello());

document.write(greetHTML)
document.write(godbyeMessage)

