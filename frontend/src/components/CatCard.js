import { Typography, Card, CardContent} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom';

function CatCard({ categoryName, numOfJobs }) {
    return (
        <Link to={`/saved`} style={{ textDecoration: 'none' }}>
            <Card variant="outlined" style={{ marginRight: '2em', backgroundColor: 'white', width: '10em'}}>
                <ImageIcon style={{ fontSize: '5em', color: 'black', fontWeight: 'lighter' }} />
                <CardContent>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                        {categoryName}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {numOfJobs} vacancies
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CatCard;