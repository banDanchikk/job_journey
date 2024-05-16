import { Typography, Card, CardContent} from "@mui/material";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from 'react-router-dom';

function CatCard({ categoryName, numOfJobs }) {
    return (
        <Link to={`/vacancies`} style={{ textDecoration: 'none' }}>
            <Card variant="outlined" style={{ marginRight: '2em', backgroundColor: 'white', width: '13em', height:'15em'}}>
                <NewspaperIcon style={{ fontSize: '5em', color: 'black', fontWeight: 'lighter' }} />
                <CardContent>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                        {categoryName}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {numOfJobs} vacancie
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CatCard;