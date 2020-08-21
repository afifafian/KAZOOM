import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayerName } from '../Store/action';

const PlayGate = () => {
    const [inputId, setInputId] = useState(``)
    const [player, setPlayer] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useSelector((state) => state)
    const location = {
        pathname: '/question',
        state: {
            from: 'player'
        }
    }
    const handleClick = () => {
        if (inputId === gameId) {
            dispatch(setPlayerName(player))
            history.push(location)
        } else {
            alert(`id is invalid!`)
        }
    }
    return (
        <>
            <div style={{width: '300px', margin: '50px auto'}}>
                <Form className="text-center">
                    <FormGroup>
                        <Label>Input ID</Label>
                        <Input onChange={(e) => setInputId(e.target.value)} type="text" placeholder="ID here.."/>
                        <Label>Your Name</Label>
                        <Input onChange={(e) => setPlayer(e.target.value)} type="text" placeholder="Name here.."/>
                    </FormGroup>
                    <Button onClick={() => handleClick()}>Play!</Button>
                </Form>
            </div>
        </>
    )
}

export default PlayGate