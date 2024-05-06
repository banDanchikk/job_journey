import { Typography, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function MyCV({ cvName}) {
    return (
        <div style={{backgroundColor: 'white', marginBottom:'1em'}}>
            <div style={{display:'flex', flexDirection: 'row',border:'1px solid', borderColor: 'rgba(0, 0, 0, 0.5)', borderRadius:'10px', alignItems: 'center'}}>
                <IconButton style={{marginLeft:'1em'}}><CloseIcon style={{color:'white', backgroundColor: 'rgba(68, 202, 146, 0.5)', borderRadius:'100px', fontSize:'1.5em'}}/></IconButton>
                <Typography style={{fontSize:'1.5em', marginLeft:'2em'}}>{cvName}</Typography>
            </div>
        </div>
    );
}

export default MyCV;