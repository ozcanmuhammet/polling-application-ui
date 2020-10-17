import React from 'react';
import { List } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const PollItem = (props) => {
    return (
        <Link to={{
            pathname: `/poll/${props.poll.id}`,
            name: props.poll.name
        }}>
            <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>{props.poll.name}</List.Header>
                    <List.Description as='a'>Updated 10 mins ago</List.Description>
                </List.Content>
            </List.Item>
        </Link>
    )

}
export default PollItem;