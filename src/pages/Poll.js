import React, { useState, useEffect } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import pollingApi from '../apis/pollingApi';
import { ADMIN_USER, HTTP_OK } from '../util/Constants';
import Question from '../components/Question';
import PollHeader from '../components/PollHeader';
import AddQuestion from '../components/AddQuestion';
import history from '../history';
import { getAuthorities, getUserId } from '../util/CookieUtil'

const Poll = (props) => {
    const [pollQuestions, setPollQuestions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    let answerMap = new Map();

    useEffect(() => {
        if (props.location.name === undefined || props.location.name === null) {
            history.push('/');
        }
        fetchPollQuestions();
    }, []);

    useEffect(() => {
        if (props.location.name === undefined || props.location.name === null) {
            history.push('/');
        }
        fetchPollQuestions();
    }, []);

    const setAnswer = (questionId, optionId) => {
        answerMap.set(questionId, optionId);
    }

    const updatePoll = async (body) => {
        const response = await pollingApi.post(`/questions`, body);
        if (response) {
            if (getAuthorities() === ADMIN_USER) {
                setIsLoaded(false);
                let tempPollQuestions = pollQuestions;
                tempPollQuestions.push(response.data);
                setPollQuestions(tempPollQuestions);
                setIsLoaded(true);
            }
        }
    }

    const handleSubmit = async () => {
        let answerList = [];
        answerMap.forEach((optionId, questionId) => {
            answerList.push({ questionId: questionId, optionId: optionId });
        });
        let body = {
            answerList: answerList,
            userId: getUserId()
        }
        const response = await pollingApi.post(`/answers`, body);
        if (response.status === HTTP_OK) {
            //TODO
            //Success Message
            history.push('/');
        }

    }

    const fetchPollQuestions = async () => {
        const response = await pollingApi.get(`/questions/${props.match.params.id}`);
        if (response.status === HTTP_OK) {
            setPollQuestions(response.data);
        }
    }

    const renderQuestionList = (pollQuestions) => {
        return pollQuestions.map((question, index) => {
            return (<Question question={question} index={index} setAnswer={setAnswer} pollId={props.match.params.id} source={'poll'} />);
        });
    }

    return (
        <div>
            <PollHeader />
            <Container>
                <Header as='h3' textAlign='center'>
                    {props.location.name}
                </Header>
                {isLoaded ? renderQuestionList(pollQuestions) : null}
                <br />
                <div>
                    <Button primary onClick={handleSubmit}>Kaydet</Button>
                    <Button secondary onClick={() => history.push('/')}>Vazgeç</Button>
                </div>
                <br />
                <div style={{ position: 'relative', width: '100%' }}>
                    <AddQuestion pollId={props.match.params.id} updatePoll={updatePoll} onClick={() => { setIsAddQuestionOpen(!isAddQuestionOpen) }} />
                </div>
            </Container>
        </div>

    );
}
export default Poll;