import React from 'react';
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import VacSearchCard from '../components/VacSerchCard';

export default function ViewVacSearcher({ jobName, description, salary, address }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#D0E9D0'}}>
            <Menu />
            <VacSearchCard jobName={'IT teacher'} address={'vul. Shevchenka, 10, m. Kiev, Ukraine, 01001'} description={'We need a sociable, active person to conduct IT training according to a ready-made developed program. Nothing complicated, but very interesting. The main thing is to have a desire to work. WORK IN THE OFFICE, conducting ONLINE and LIVE classes.'} salary={2500}/>
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}
