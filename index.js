const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
	{ id: 1, name: 'Maths' },
	{ id: 2, name: 'Science' },
	{ id: 3, name: 'English' },
	{ id: 4, name: 'Physics' }
]


app.get('/',(req,res)=>{
	res.send('Hello!!!! World');
});

app.get('/api/courses',(req,res)=>{
	res.send(courses);
	
});

app.post('/api/courses', (req, res)=>{
	/*const schema = Joi.object().keys({
		name: Joi.string().min(3).required(),
    });
	const result = Joi.validate(req.body, schema);
	//console.log(result);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}*/
	const { error } = validateCourse(req.body); //want error object destructure property	
	if(error) return res.status(400).send(error.details[0].message);
	
	const course = {
		id:courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
})

app.put('/api/courses/:id', (req, res)=>{
	const course=courses.find(c=>c.id === parseInt(req.params.id));
	if(!course) return res.status(404).send('Requested data not found');
	
	//const result = validateCourse(req.body);
	const { error } = validateCourse(req.body); //want error object destructure property	
	if(error) return res.status(400).send(error.details[0].message);
	
	course.name = req.body.name;
	res.send(course);
});

app.delete('/api/courses/:id', (req, res)=>{
	const course=courses.find(c=>c.id === parseInt(req.params.id));
	if(!course) return res.status(404).send('Requested data not found');
	
	const index = courses.indexOf(course);
	courses.splice(index, 1);
	
	res.send(course);
});

function validateCourse(course){
	const schema = Joi.object().keys({
		name: Joi.string().min(3).required(),
    });
	return Joi.validate(course, schema); 
}

app.get('/api/courses/:id', (req,res)=>{
	//res.send(req.params);
	const course=courses.find(c=>c.id === parseInt(req.params.id));
	if(!course) return res.status(404).send('Requested data not found');
	res.send(course);
});

app.get('/api/posts/:year/:month', (req,res)=>{
	//res.send(req.params);
	res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));