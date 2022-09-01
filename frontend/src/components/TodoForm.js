import React, { useState, useEffect } from "react";
import { MDBBtn,  MDBInputGroup, MDBContainer,  } from 'mdb-react-ui-kit';
import Api from './Api';


function TodoForm(setTodos, todos){
    const [todo, setName] = useState('')
    

    const handelPost = () => {
        Api.post('/todo/', {
            'name': todo
        })
        .then((res) => {
            const {data} = res;
            console.log('post data: ', data)
            const newTodos = todos.map( todo => {
                return todo;
            })
            setTodos(newTodos)
        }).catch((e) => {
            console.log(e)
            alert('post error')
        })
    }

    const handleChange = (e) => {
        setName(e.target.value);
        console.log(todo)
    }
    return (
        <div>
            <MDBContainer>
                <form>
                    <MDBInputGroup className="mb-3" size='lg'>
                        <input className='form-control' onChange={handleChange} value={todo} placeholder="New Todo" type='text' />
                        <MDBBtn type="submit" onClick={handelPost}>Add Todo</MDBBtn>
                    </MDBInputGroup>
                </form>
                
            </MDBContainer>
            
        </div>
    );
}

export default TodoForm;