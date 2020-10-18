import React, { useState, useEffect } from 'react';
import { List, Grid, Divider, Header, Icon } from 'semantic-ui-react'
import pollingApi from '../apis/pollingApi';
import PollHeader from '../components/PollHeader';
import { HTTP_OK } from '../util/Constants';

const Statistics = () => {
    const [statisticsList, setStatisticsList] = useState([]);
    const [questionText, setQuestionText] = useState("");

    useEffect(() => {
        fetchStatistics();
    }, [])

    const fetchStatistics = async () => {
        const response = await pollingApi.get("/admin/answers/statistics");
        if (response.status === HTTP_OK) {
            setStatisticsList(response.data);
        }
    }

    const renderStatisticItem = () => {
        if (statisticsList) {
            return statisticsList.map((statistic, index) => {
                return <StatisticItem questionText={statistic.questionText} statistic={statistic.statisticOptionDtoList} index={index} />
            });
        } else {
            return "Hiç istatistik yok";
        }
    }

    return (
        <div>
            <PollHeader />
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='bar chart' />
                    İstatistik
                 </Header>
            </Divider>
            <List divided relaxed>
                {renderStatisticItem()}
            </List>
        </div>
    )
}

const StatisticItem = (props) => {

    const renderOptionList = () => {
        return props.statistic.map((statistic, index) => {
            return (
                <div>
                    <Grid.Row>
                        <Grid.Column>
                            <label><strong>Seçenek: </strong> {statistic.optionText}</label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <label><strong>Seçilme sayısı: </strong> {statistic.answerCount}</label>
                        </Grid.Column>
                    </Grid.Row>
                    <br />
                </div>
            );
        });
    }

    return (
        <div>
            <Grid divided>
                <Grid.Row>
                    <Grid.Column>
                        <label><strong>Soru: </strong> {props.questionText}</label>
                    </Grid.Column>
                </Grid.Row>

                <div style={{ marginLeft: '3%' }}>
                    {renderOptionList()}
                </div>
            </Grid>
            <Divider section />
        </div>
    );
}
export default Statistics;