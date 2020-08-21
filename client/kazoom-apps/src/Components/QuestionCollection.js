import React from 'react';
import {Button} from 'reactstrap';
import {useDispatch} from 'react-redux';
import { setQuestions, deleteCollection } from '../Store/action';

const Collection = ({data}) => {
    const dispatch = useDispatch()
    const handleUse = () => {
        dispatch(setQuestions(data.questions))
    }

    const handleDelete = (id) => {
        dispatch(deleteCollection(id))
    }
    return (
        <div>
            <span className="d-inline-block text-truncate" style={{marginRight: '20px', width: '180px'}}>{data.title}</span>
            <span>Total Question: {data.questions.length}</span><br/>
            <div className="mt-2">
                <Button onClick={() => handleUse()} size="sm" color="info" className="mr-2">Choose</Button>
                <Button onClick={() => handleDelete(data.id)} size="sm" color="danger">Delete</Button>
            </div>
        </div>
    )
}

export default Collection