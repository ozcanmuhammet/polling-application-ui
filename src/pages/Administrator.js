import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react'
import pollingApi from '../apis/pollingApi';
import PollHeader from '../components/PollHeader';
import Question from '../components/Question';
import { HTTP_OK } from '../util/Constants';

const Administrator = () => {
    const [pendingQuestionList, setPendingQuestionList] = useState([]);

    useEffect(() => {
        fetchPendingQuestionList();
    }, [])

    const fetchPendingQuestionList = async () => {
        const response = await pollingApi.get("/questions/pending");
        if (response.status === HTTP_OK) {
            setPendingQuestionList(response.data);
        }
    }

    const renderPendingQuestionItems = () => {
        return pendingQuestionList.map((question, index) => {
            return <Question question={question} index={index} />
        });
    }

    return (
        <div>
            <PollHeader />
            <List divided relaxed>
                {renderPendingQuestionItems()}
            </List>
        </div>
    )
}
export default Administrator;