import React from 'react';
import { List, Grid } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const PollItem = (props) => {
    const icon = () => {
        if (props.poll.name) {
            let word = props.poll.name.substr(0, 1);
            return <div style={{ fontSize: '30px' }}><strong>{word.toUpperCase()}</strong></div>
        }

    }

    return (
        <Link to={{
            pathname: `/poll/${props.poll.id}`,
            name: props.poll.name
        }}>
            <List.Item>
                <List.Content>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                {icon()}
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <List.Header as='a'>{props.poll.name}</List.Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </List.Content>
            </List.Item>
        </Link>
    )

}
export default PollItem;