import { Typography, Button, TextField, IconButton} from "@mui/material";
import { Link } from "react-router-dom";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Menu />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '87.5vh' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#44CA92', textAlign: 'center', padding: '2em', width:'45%', alignItems:'center', justifyContent: 'center', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}>
                        <Typography style={{ fontWeight: 'bold', color: 'white', fontSize: '3em' }}>Welcome Back!</Typography>
                        <Typography style={{ color: 'white', fontSize: '1.5em' }}>To keep connection with us please login with your personal information</Typography>
                        <Link to="/login">
                            <Button variant='outlined' style={{ color: 'white', fontSize: '1.5em', borderRadius: '100px', borderColor: 'white', marginTop: '1em'}}>Sign in</Button>
                        </Link>
                    </div>
                    <div style={{ backgroundColor: '#D0E9D0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2em', width:'55%', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                        <Typography style={{ fontWeight: 'bold', color: '#44CA92', fontSize: '3em' }}>Create Account</Typography>
                        <Typography style={{ color: '#8EB48A', fontSize: '1em', fontWeight: 'bolder' }}>Use your e-mail for registration</Typography>
                        <TextField id="name" label="Name" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '100%'}} />
                        <TextField id="email" label="Email" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '100%' }} />
                        <TextField id="password" label="Password" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '100%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#8EB48A', marginTop: '1em' }}>
                            <FormLabel component="legend" style={{ textAlign: 'center', marginRight: '1em', fontWeight: 'bold', color: '#8EB48A' }}>I am:</FormLabel>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="gender" name="gender1">
                                    <FormControlLabel value="female" control={<Radio />} label="Female" style={{ width: 'auto' }} />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" style={{ width: 'auto' }} />
                                </RadioGroup>
                            </FormControl>
                            <Button variant='outlined' style={{backgroundColor: '#44CA92', color: 'white', fontSize: '1.5em', borderRadius: '100px', borderColor: 'transparent', marginTop: '1em' }}>Sign up</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 'auto' }}>
                <Bottom />
            </div>
        </div>
    );
}