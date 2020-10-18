

import React, { useState, useEffect } from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import { getToken, getAuthorities, removeToken } from '../util/CookieUtil';
import history from '../history';
import { ADMIN_USER } from '../util/Constants';

const PollHeader = () => {

    useEffect(() => {
        if (getToken() === undefined || getToken() === null) {
            history.push('/login');
        }
    }, [getToken()]);

    const logout = () => {
        removeToken();
        window.location.reload();
    }

    return (
        <div>
            { getToken() !== undefined && getToken() !== null ?
                <Grid columns={1} doubling>
                    <Grid.Column>
                        <Menu>
                            <Menu.Item
                                name='Anasayfa'
                                onClick={() => history.push('/')}
                            />
                            {getAuthorities() === ADMIN_USER ? <Menu.Item
                                name='Onay Bekleyenler'
                                onClick={() => history.push('/admin')}
                            /> : null}

                            {getAuthorities() === ADMIN_USER ? <Menu.Item
                                name='Istatistik'
                                onClick={() => history.push('/statistic')}
                            /> : null}

                            <Menu.Item
                                position='right'
                                name='Çıkış'
                                onClick={logout}
                            />
                        </Menu>
                    </Grid.Column>
                </Grid> : null
            }

        </div>
    );
}



export default PollHeader;

