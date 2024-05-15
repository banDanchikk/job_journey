import React from 'react';
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import VacEmpCard from '../components/VacEmpCard';

export default function ViewVacanciesEmpl({ jobName, description, salary, address }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#D0E9D0'}}>
            <Menu />
            <VacEmpCard jobName={'Job Name'}/>
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}
