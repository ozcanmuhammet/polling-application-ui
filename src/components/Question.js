import React, { useState } from 'react';
import { Container, Grid, Checkbox, Divider } from 'semantic-ui-react';
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
            return <Answer option={option} setOption={answer} selectedOption={selectedOption} source={props.source} />
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
            <Grid columns={1}>
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

                <Grid.Row style={{ marginTop: '-2%' }}>
                    {renderOptionsList()}
                </Grid.Row>
            </Grid>
            <Divider section />
        </Container>
    )
}

const Answer = (props) => {
    return (
        <Grid.Column>
            {props.source === 'admin' ?
                <Checkbox disabled label={{ children: props.option.optionText }} value={props.option.id} />
                :
                <Checkbox label={{ children: props.option.optionText }} value={props.option.id} checked={props.option.id === props.selectedOption} onClick={() => props.setOption(props.option.id)} />
            }

        </Grid.Column>
    )
}


export default Question;