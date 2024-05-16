import { Typography, Card, CardContent, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

function SavedJob({ jobName, description }) {
    return (
        <Link to={`/vivaserch`} style={{ textDecoration: 'none', width: '80%' }}>
            <Card variant="outlined" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: '10px' }}>
                <CardContent>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                        {jobName}
                    </Typography>
                    <Typography variant="body1" component="div" style={{ marginTop: '1em' }}>
                        {description}
                    </Typography>
                </CardContent>
                <Button variant="outlined" startIcon={<DeleteIcon />} style={{ borderRadius: '100px', backgroundColor: 'white', color: 'black', borderColor:'black', marginRight: '1em' }}> Delete </Button>
            </Card>
        </Link>
    );
}

export default SavedJob;
