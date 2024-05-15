import React from 'react';
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import VacSearchCard from '../components/VacSerchCard';

export default function ViewVacSearcher({ jobName, description, salary, address }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#D0E9D0'}}>
            <Menu />
            <VacSearchCard jobName={'Job Name'}/>
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}
