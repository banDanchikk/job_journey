import { Typography} from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import CatCard from "../components/CatCard";
import ComputerIcon from '@mui/icons-material/Computer';

export default function Categories() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#CBE3F0' }}>
            <Menu />
            <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '1em', marginTop: '2.5em' }}>Most Demanding Categories</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2em' }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '70%', margin: 'auto', marginBottom: '2em' }}>
                    <CatCard categoryName="IT" numOfJobs={1}/>
                    <CatCard categoryName="Design" numOfJobs={1} />
                    <CatCard categoryName="Busines" numOfJobs={1} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '70%', margin: 'auto' }}>
                    <CatCard categoryName="Education" numOfJobs={1} />
                    <CatCard categoryName="Real estate" numOfJobs={1} />
                    <CatCard categoryName="Marketing" numOfJobs={1} />
                </div>
            </div>
            <div style={{ marginTop: 'auto' }}>
                <Bottom />
            </div>
        </div>
    );
}
