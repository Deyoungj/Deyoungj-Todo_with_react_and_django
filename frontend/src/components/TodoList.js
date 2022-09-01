import React, { useState, useEffect } from 'react';
import { MDBListGroup,
    MDBListGroupItem,
    MDBContainer, 
    MDBCheckbox,
    MDBIcon, 
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput
    } from "mdb-react-ui-kit"
import Api from './Api';

function TodoList({todos = [], setTodos}){

    const [show, setShow] = useState(false);

    const [record, setRecord] = useState(null);


    const handleChange = (e) => {
        console.log(e.target.value);
        setRecord({
            ...record,
            name: e.target.value
        });

    }

    

    const toggleShow = () => {
        setShow(!show);
    }

    const handleUpdate = async (id, value) => {
        return Api.patch(`/todo/${id}/`,value)
        .then((res) => {
            const { data } = res;
            console.log('data from update',data)
            const newTodos = todos.map( todo => {
                if (todo.id === id){
                    return data;
                }
                return todo;
            })
            setTodos(newTodos)
        }).catch((e) => {

            console.log(e);
            alert('something went wrong')
        })
    
    }

    

const handelDelete = (id) => {
    Api.delete(`/todo/${id}/`)
    .then(() => {
        const newTodos = todos.filter( todo => {
            return todo.id !== id
        });

        setTodos(newTodos);
    }).catch(() => {
        alert('delete error')
    })
}

    const handleSaveChanges = async () => {
        console.log(record.id, record)
        await handleUpdate(record.id, 
            {name: record.name}
            );
        toggleShow()
    }

    const completedTodo = todos.filter(todos => todos.completed === true);

    const uncompletedTodo = todos.filter(todos => todos.completed === false);

    return (
        <MDBContainer>
            <div className="mb-2 mt-4">
                Uncompleted Todos ({uncompletedTodo.length})

            </div>
            <MDBListGroup>
                {uncompletedTodo.map((todo) => (
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center ' key={todo.id}>
                        
                        <span className='text-start'>
                            {todo.completed === true? <MDBCheckbox inline onClick={() => {
                                handleUpdate(todo.id, {completed: false})
                            }}  defaultChecked className="" /> :

                                <MDBCheckbox inline onClick={() => {
                                    handleUpdate(todo.id, {completed: true})
                                }} className="" />
                            }
                             {todo.name} </span>

                        <span className=' d-flex justify-content-end text-end  '>
                     <MDBIcon fas icon="pen" className='text-end' onClick={() => {
                         setRecord(todo);
                         toggleShow()
                     }} style={{ 
                        cursor : "pointer",
                        marginRight : "12px"
                    }}/>

                    <MDBIcon fas icon="trash" className='text-end text-danger' onClick={() => {
                        handelDelete(todo.id);
                    }} style={{
                        cursor : "pointer",
                    }}/>
                    </span>

                    </MDBListGroupItem>
             ) )}
            </MDBListGroup>
            
            <div className="mb-2 mt-4">
                Completed Todos ({completedTodo.length})

            </div>
           
            <MDBListGroup>
                {completedTodo.map((todo) => (
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center ' key={todo.id}>
                        
                        <span className='text-start'>
                            {todo.completed === true? <MDBCheckbox inline onClick={() => {
                                handleUpdate(todo.id, {completed: false})
                            }}  defaultChecked className="" /> :

                                <MDBCheckbox inline onClick={() => {
                                    handleUpdate(todo.id, {completed: true})
                                }} className="" />
                            }
                             {todo.name} </span>

                        <span className=' d-flex justify-content-end text-end  '>
                     <MDBIcon fas icon="pen" className='text-end' onClick={() => {
                         setRecord(todo);
                         toggleShow()
                     }} style={{ 
                        cursor : "pointer",
                        marginRight : "12px"
                    }}/>

                    <MDBIcon fas icon="trash" className='text-end text-danger' onClick={() => {
                        handelDelete(todo.id);
                    }} style={{
                        cursor : "pointer",
                    }}/>
                    </span>

                    </MDBListGroupItem>
             ) )}
            </MDBListGroup>


            <MDBModal show={show} setShow={setShow} tabIndex='-1'>
            <MDBModalDialog>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Update Todo</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                
                    <MDBInput label='New Todo' id='form1' type='text' onChange={handleChange} value={record? record.name : ""} placeholder='new todo' />
                </MDBModalBody>

                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                    Close
                </MDBBtn>
                <MDBBtn onClick={handleSaveChanges}>Update Todo</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>

        </MDBContainer>
       
        
    )
    
    }


export default TodoList;
