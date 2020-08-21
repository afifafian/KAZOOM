import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions } from '../Store/action';

const Result = () => {
    const { playerPoint } = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleHome = () => {
        dispatch(setQuestions([]))
        history.push(`/`)
    }
    return (
        <div className="d-flex flex-column align-items-center">
            {/* {JSON.stringify(playerPoint)} */}
            <Container className="mt-5">
                <h3 className="text-center">Result</h3>
                <Table>
                    <thead>
                        <tr>
                        <th>User</th>
                        <th>Final Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Mahmud</td>
                        <td>{playerPoint}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Button onClick={() => handleHome()}>Home</Button>
        </div>
    )
}

export default Result

