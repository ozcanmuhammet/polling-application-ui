
import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Header, Icon } from 'semantic-ui-react'
import pollingApi from '../apis/pollingApi';
import { checkLogin, getUserId } from '../util/CookieUtil';
import { HTTP_OK } from '../util/Constants';

const EditQuestion = (props) => {
    const [optionList, setOptionList] = useState(props.optionList);
    const [questionText, setQuestionText] = useState(props.questionText);
    const [open, setOpen] = React.useState(false);
    const questionId = props.questionId;

    useEffect(() => {
        checkLogin();
    }, []);

    const editOption = (value, index) => {
        if (value) {
            let tempOptionList = optionList;
            tempOptionList[index].optionText = value;
            setOptionList(tempOptionList);
        }
    }

    const renderOptionList = () => {
        if (optionList) {
            return optionList.map((option, index) => {
                return <Option option={option} index={index} updateParent={editOption} />
            });
        }
    }

    const closeModalEvent = () => {
        setOpen(false);
        setOptionList([]);
    }

    const submitModalEvent = async () => {
        if (questionText !== null && optionList.length > 0) {
            let body = {
                userId: getUserId(),
                questionId: questionId,
                questionText: questionText,
                optionList: optionList
            }
            const response = await pollingApi.put(`/questions/${questionId}`, body);
            if (response.status === HTTP_OK) {
                //TODO
                //SUCCESS MESSAGE
                props.updateQuestion(body);
                setOpen(false);
            }
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button circular style={{ float: 'right', display: "inline-block" }} icon='edit' />}
        >
            <Modal.Header>Soru Güncelle</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Input fluid placeholder='Soru ekle' value={questionText} onChange={(e) => { setQuestionText(e.target.value) }} />
                    <Header as='h4' textAlign='center'>
                        Seçenekler
                    </Header>
                    {renderOptionList()}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={closeModalEvent}>
                    Vazgeç
          </Button>
                <Button
                    content="Güncelle"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={submitModalEvent}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

const Option = (props) => {
    const [optionText, setOptionText] = useState(props.option.optionText);

    const editOption = (e) => {
        e.preventDefault();
        setOptionText(e.target.value);
        props.updateParent(e.target.value, props.index);
    }

    return (
        <div>
            <strong>{`${props.index + 1}) `}</strong>
            <Input fluid placeholder='Soru ekle' value={optionText} onChange={editOption} />
            <br />
        </div>
    );
}

export default EditQuestion;