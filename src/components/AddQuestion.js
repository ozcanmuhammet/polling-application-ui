
import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Header, Icon } from 'semantic-ui-react'
import pollingApi from '../apis/pollingApi';
import { checkLogin, getUserId } from '../util/CookieUtil';
import { HTTP_OK } from '../util/Constants';
import PollHeader from '../components/PollHeader';

const AddQuestion = (props) => {
    const [optionList, setOptionList] = useState([]);
    const [optionText, setOptionText] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [open, setOpen] = React.useState(false);
    const pollId = props.pollId;

    useEffect(() => {
        checkLogin();
    }, []);

    const addQuestion = () => {
        if (optionText) {
            let tempOptionList = optionList;
            tempOptionList.push(optionText);
            setOptionList(tempOptionList);
            setOptionText("");
        }
    }

    const renderQuestionList = () => {
        if (optionList) {
            return optionList.map((optionText, index) => {
                return (<div><strong>{`${index + 1}) `}</strong>{optionText}<br /></div>);
            });
        }
    }

    const closeModalEvent = () => {
        setOpen(false);
        setOptionList([]);
        setOptionText("");
    }

    const submitModalEvent = () => {
        if (questionText !== null && optionList.length > 0) {
            let body = {
                userId: getUserId(),
                pollId: pollId,
                questionText: questionText,
                optionList: optionList
            }
            props.updatePoll(body);
            setOpen(false);
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button circular style={{ margin: 'auto', display: 'block' }} icon='plus circle' />}
        >
            <Modal.Header>Soru Ekle</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Input fluid placeholder='Soru ekle' value={questionText} onChange={(e) => { setQuestionText(e.target.value) }} />
                    <Header as='h4' textAlign='center'>
                        Seçenekler
                    </Header>
                    {renderQuestionList()}
                    <Input
                        fluid
                        value={optionText}
                        icon={<Icon name='plus circle' onClick={addQuestion} inverted circular link />}
                        placeholder='Seçenek ekle'
                        onChange={(e) => { setOptionText(e.target.value) }}
                    />

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={closeModalEvent}>
                    Vazgeç
          </Button>
                <Button
                    content="Ekle"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={submitModalEvent}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default AddQuestion;