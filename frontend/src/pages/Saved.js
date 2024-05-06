import { Typography} from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import SavedJob from "../components/SavedJob";

export default function () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#CBE3F0' }}>
            <Menu />
            <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '1em', marginTop: '2.5em' }}>Saved Jobs</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'2em' }}>
                <SavedJob jobName={"Помічник харчового технолога в крафтовій сироварні"} description={"Пройти 5 стажувань до цього"}/>
            </div>
            
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}