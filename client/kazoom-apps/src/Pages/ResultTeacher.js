import React from 'react';
import { Table, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { playerPoints, questionsData } from '../config/makeVar';
import { DELETE_ALL_QUESTION, FETCH_QUESTIONS } from '../config/queries';
import { useMutation } from '@apollo/client';

const ResultTeacher = () => {
    const history = useHistory()
    const results = playerPoints()
    const pureResult = results.filter(result => result.type !== 'teacher')
    const [deleteMany] = useMutation(DELETE_ALL_QUESTION, {
        refetchQueries: [{
            query: FETCH_QUESTIONS
        }],
        onCompleted: () => {
            questionsData([])
            playerPoints([])
            localStorage.clear()
            history.push({
                pathname: `/`,
                state: 'result'
            })
        }
    })

    const handleHome = () => {
        deleteMany()
    }

    return (
        <div className="d-flex flex-column align-items-center  mx-5">
            <Container className="tableResultTeacher" style={{marginTop: '100px', color: 'white'}}>
                <h3 className="text-center mb-4">Result</h3>
                <div style={{minHeight: '300px'}}>
                    <Table className="text-center text-light">
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
                </div>
            </Container>
            <button className="buttonLogin mt-5" onClick={() => handleHome()}>Home</button> 
        </div>
    )

}

export default ResultTeacher

