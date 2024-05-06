import { Typography, Card, CardContent} from "@mui/material";
import Divider from '@mui/material/Divider';

function Comment({ jobName, description }) {
    return (
        <Card variant="outlined" style={{ marginBottom: '5em', backgroundColor: '#44CA92', color: 'white', width: '30%' }}>
            <CardContent>
              <Typography variant="h4" component="div" style={{ fontWeight: 'bold' }}>Username</Typography>
              <Divider style={{ width: '100%', backgroundColor: 'white' }} />
              <Typography variant="body1" component="div" style={{ marginTop: '1em', fontSize: '1.5em', textAlign: 'left' }}>
                lorem ipsum aeirhgaieugh ...</Typography>
            </CardContent>
        </Card>
    );
}

export default Comment;