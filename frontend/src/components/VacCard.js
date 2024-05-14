import { Typography, Card, CardContent, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

function VacCard({ jobName, description, salary, address }) {
    return (
        <Link to={`/categories`} style={{ textDecoration: 'none'}}>
            <Card variant="outlined" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: '10px', width:'60%', marginBottom:'1em' }}>
                <CardContent>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                        {jobName}
                    </Typography>
                    <Typography variant="body1" component="div" style={{ marginTop: '1em', fontWeight: 'bolder' }}>
                        {salary}
                    </Typography>
                    <Typography variant="body1" component="div" style={{ marginTop: '1em', fontWeight: 'bolder'}}>
                        {address}
                    </Typography>
                    <Typography variant="body1" component="div" style={{ marginTop: '1em' }}>
                        {description}
                    </Typography>
                </CardContent>
                <Button variant="outlined" startIcon={<FavoriteBorderIcon />} style={{ fontWeight: 'bold', borderRadius: '100px', backgroundColor: 'white', color: '#44CA92', borderColor:'#44CA92', marginTop: 'auto', alignSelf: 'flex-end', marginRight: '1em', marginBottom: '2em'}}> Save </Button>
            </Card>
        </Link>
    );
}

export default VacCard;
