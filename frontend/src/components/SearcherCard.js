import { Typography, Button, Avatar} from "@mui/material";

function SearcherCard({ name, birthDate, cityName, address, number, email, social, image }) {
    return (
        <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'row', width:'50%', borderRadius:'15px', padding:'1em', margin: '2em'}}>
            <div>
                <Typography style={{fontSize:'2em', marginBottom: '0.5em', fontWeight:'bold'}}>{name}</Typography>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <Typography style={{ fontSize: '1.5em', marginBottom: '0.5em', fontWeight:'bolder' }}>Date of Birth:</Typography>
                    <Typography style={{ marginLeft: '1em', fontSize: '1.5em' }}>{birthDate}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <Typography style={{fontSize:'1.5em', marginBottom: '0.5em', fontWeight:'bolder'}}>Your City: </Typography>
                    <Typography style={{ marginLeft: '1em', fontSize: '1.5em' }}>{cityName}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                <Typography style={{fontSize:'1.5em', marginBottom: '0.5em', fontWeight:'bolder'}}>Address: </Typography>
                <Typography style={{ marginLeft: '1em', fontSize: '1.5em' }}>{address}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                <Typography style={{fontSize:'1.5em', marginBottom: '0.5em', fontWeight:'bolder'}}>Phone Number: </Typography>
                <Typography style={{ marginLeft: '1em', fontSize: '1.5em' }}>{number}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <Typography style={{fontSize:'1.5em', marginBottom: '0.5em', fontWeight:'bolder'}}>Email: </Typography>
                    <Typography style={{ marginLeft: '1em', fontSize: '1.5em' }}>{email}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <Typography style={{fontSize:'1.5em', fontWeight:'bolder'}}>Social Networks: </Typography>
                    <Typography style={{ marginLeft: '1em', fontSize: '1.5em' }}>{social}</Typography>
                </div>
            </div>
            <div style={{marginLeft: 'auto', textAlign: 'center'}}>
                <Avatar alt="User" style={{width:'9em', height:'9em', marginTop: '1em'}}/>
                <Button variant="contained" style={{backgroundColor:'#44CA92', borderRadius:'100px', boxShadow: 'none', marginTop:'2em', width: '12em', height:'5em'}}>Upload CV</Button>
            </div>
            
        </div>
    );
}

export default SearcherCard;