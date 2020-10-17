import React, { useState } from 'react';
import { Container, Grid, Checkbox, Icon } from 'semantic-ui-react';
import EditQuestion from '../components/EditQuestion';
import history from '../history';
import { getAuthorities } from '../util/CookieUtil';
import { ADMIN_USER } from '../util/Constants';

const Question = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [questionText, setQuestionText] = useState(props.question.text);
    const [optionList, setOptionList] = useState(props.question.optionDtoList);

    const renderOptionsList = () => {
        return optionList.map((option) => {
            return <Answer option={option} setOption={answer} selectedOption={selectedOption} />
        });
    }

    const answer = (optionNo) => {
        setSelectedOption(optionNo);
        props.setAnswer(props.question.id, optionNo);
    }

    const updateQuestion = (question) => {
        setOptionList(question.optionList);
        setQuestionText(question.questionText);
    }

    return (
        <Container>
            <Grid columns={1} divided>
                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <div style={{ display: "inline-block" }}><strong>{`${props.index + 1}) `}</strong><label>{questionText}</label> </div>
                            {getAuthorities() === ADMIN_USER ?
                                <EditQuestion updateQuestion={updateQuestion} questionId={props.question.id} questionText={questionText} optionList={optionList} /> : null
                            }
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row >
                    {renderOptionsList()}
                </Grid.Row>
            </Grid>

            <label>{props.text}</label>

        </Container>
    )
}

const Answer = (props) => {
    return (
        <Grid.Column>
            <Checkbox label={{ children: props.option.optionText }} value={props.option.id} checked={props.option.id === props.selectedOption} onClick={() => props.setOption(props.option.id)} />
        </Grid.Column>
    )
}


export default Question;