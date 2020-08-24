import React from 'react';
import { Table, Container, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { playerPoints, questionsData } from '../config/makeVar';
import { DELETE_ALL_QUESTION, FETCH_QUESTIONS } from '../config/queries';
import { useMutation } from '@apollo/client';

const ResultTeacher = () => {
    const history = useHistory()
    const results = playerPoints()
    const pureResult = results.filter(result => result.user !== 'Teacher')
    const [deleteMany] = useMutation(DELETE_ALL_QUESTION, {
        refetchQueries: [{
            query: FETCH_QUESTIONS
        }],
        onCompleted: () => {
            questionsData([])
            playerPoints([])
            history.push(`/`)
        }
    })

    const handleHome = () => {
        localStorage.clear()
        deleteMany()
    }

    return (
        <div className="d-flex flex-column align-items-center">
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
                        {
                            pureResult.map(result => (
                                <tr key={result.id}>
                                    <td>{result.user}</td>
                                    <td>{result.point}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
            <Button onClick={() => handleHome()}>Home</Button>
        </div>
    )

}

export default ResultTeacher

