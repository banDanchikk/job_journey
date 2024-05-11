import { Typography} from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import CatCard from "../components/CatCard";

export default function Categories() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#CBE3F0' }}>
            <Menu />
            <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '1em', marginTop: '2.5em' }}>Most Demanding Categories</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2em' }}>
                <CatCard categoryName="IT" numOfJobs={100} />
                <CatCard categoryName="IT" numOfJobs={100} />
                <CatCard categoryName="IT" numOfJobs={100} />
            </div>
            <div style={{ marginTop: 'auto' }}>
                <Bottom />
            </div>
        </div>
    );
}
