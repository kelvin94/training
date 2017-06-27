const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');
const {todos, populateTodos} = require('./seed/seed');



beforeEach( populateTodos );


describe('PATCH /todos/:id ', ()=>{
    it('should update todo', (done)=>{
        let id = todos[1]._id.toHexString();
        var text = 'should be new text';
        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed: true,
                text: text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');

            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done)=>{
        let id = todos[1]._id.toHexString();
        var text = 'should be new text!!!';
        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed: false,
                text: text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();

            })
            .end(done);
    });
});

describe('GET /todos/:id ', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo is not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);

    });
    it('should return 404 if id is invalid', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });



});

describe('DELETE /todos/:id ', ()=>{
    it('should remove a todo', (done)=>{
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect( (res)=>{
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
            Todo.findById(hexId).then( (todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch( (err)=>done(err));
            });
    });
    it('should return 404 if todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 if obj id is invalid', (done)=>{
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
});






describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect( (res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});



describe('POST /todos', () =>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text: text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end( (err, res)=>{
                if(err){
                    return done(err);
                }

                Todo.find({text}).then( (todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( (err)=>{
                    done(err);
                });
            });
    });

    it('Should not create a todo with invalid body data', (done) => {
        var text = '';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end(( err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then( (todo) => {
                    expect(todo.length).toBe(2);
                    done();
                }).catch( (err)=> {done(err);} );
            });
    });




});

