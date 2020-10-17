
import React, { useState, useEffect } from 'react'
import { List } from 'semantic-ui-react'
import pollingApi from '../apis/pollingApi';
import { checkLogin } from '../util/CookieUtil';
import { HTTP_OK } from '../util/Constants';
import PollItem from '../components/PollItem';
import PollHeader from '../components/PollHeader';

const Home = () => {
    const [pollList, setPollList] = useState([]);

    useEffect(() => {
        checkLogin();
        fetchPollItems();
    }, []);

    const fetchPollItems = async () => {
        const response = await pollingApi.get('/polls');
        if (response.status === HTTP_OK) {
            setPollList(response.data);
        }
    }

    const renderPollItems = () => {
        return pollList.map((poll) => {
            return <PollItem poll={poll} />
        });

    }

    return (
        <div>
            <PollHeader />
            <List divided relaxed>
                {renderPollItems()}
            </List>
        </div>
    );
}



export default Home;