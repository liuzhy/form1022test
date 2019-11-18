import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ListAltIcon from '@material-ui/icons/ListAlt';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    border:'1px solid #eee',
    borderRadius:'5px',
    width:'65%',
    marginLeft:'auto',
    marginRight:'auto',
    minHeight:'70vh'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '65%',
  },
  typography1:{
    width:'95%',
    textAlign:'left',
    paddingLeft:theme.spacing(1)
},
typography2:{
    textAlign:'left',
    paddingLeft:theme.spacing(10)
},
formgroup1:{
      marginLeft:theme.spacing(10)
  }
}));

function getSteps() {
  return ['Select File', 'Select Form', 'Edit information or export pdf'];
}


export default function FormEditComponent() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <List  component="nav">
          {["1022","1023"].map(index =>(
              <ListItem button onClick={handleNext}>
              <ListItemIcon>
                  <ListAltIcon fontSize='large' color={index==='1022'?'primary':'grey'} />
              </ListItemIcon>
              <ListItemText
                  primary={`File ${index}`}
                  secondary='Click here...'
              />
              </ListItem>
          ))}
          </List>);
      case 1:
        return (
          <List  component="nav">
              <ListItem button onClick={handleBack}>
                  <ListItemIcon>
                    <ArrowBackIcon fontSize='large' color='secondary' />
                  </ListItemIcon>
                  <ListItemText 
                    primary='Back to File List'
                  />
              </ListItem>
          {[1,2,3,4,5].map(page =>(
              <ListItem button  onClick={page===3 && handleNext}>
              <ListItemIcon>
                  <InsertDriveFileOutlinedIcon  fontSize='large' color={page===3?'primary':'grey'} />
              </ListItemIcon>
              <ListItemText
                  primary={`Page ${page}`}
                  secondary={page===3?'Click here for more...':''}
              />
              </ListItem>
          ))}
          </List>);
      case 2:
        return (
            <div>
                <List  component="nav">
                    <ListItem button onClick={handleBack}>
                        <ListItemIcon>
                            <ArrowBackIcon fontSize='large' color='secondary' />
                        </ListItemIcon>
                        <ListItemText 
                            primary='Back to File List'
                        />
                    </ListItem>
                </List>
                <Typography className={classes.typography1}>
                    1.Your Full Name    
                    <FormGroup className={classes.formgroup1}>
                    {['Family Name','Given Names'].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            required
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>
                </Typography>
                <Typography className={classes.typography1}>
                    2.Date of birth
                    <FormGroup className={classes.formgroup1}>
                    {['Birthday'].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            required
                            id="date"
                            label={item}
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            margin="normal"
                        />
                        }
                    />
                    ))}
                    </FormGroup>                    
                </Typography>
                <Typography className={classes.typography1}>
                    3.Place of birth    
                    <FormGroup className={classes.formgroup1}>
                    {['Town/city','Country'].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            required
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>                    
                </Typography>
                <Typography className={classes.typography1}>
                    4.Relationship status
                    <FormGroup className={classes.formgroup1}>
                    {['Married','Engaged','De facto','Separated','Divorced','Widowed','Never married or been in a de facto relationship'].map(item=>(
                        <FormControlLabel
                        control={<Checkbox 
                            // checked={gilad} 
                            // onChange={handleChange('gilad')} 
                            color='primary'
                            labelPlacement="bottom"
                            value={item} />}
                        label={item}
                    />
                    ))}
                    </FormGroup>
                </Typography>
                <Typography className={classes.typography1}>
                    5.Details from your passport
                    <FormGroup className={classes.formgroup1}>
                    {['Passport number','Country of passport'].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            required
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>       
                </Typography>
                <Typography className={classes.typography1}>
                    6.Details of identity card or identity number issued to you by your government (if applicable) eg. National identity card.<br />
                    <b>Note:</b> If you are the holder of multiple identity numbers because you are a citizen of more than one country, you need to enter the identity number on the card from the country that you live in.
                    <FormGroup className={classes.formgroup1}>
                    {['Identity number','Country of issue'].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            required
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>       
                </Typography>
                <Typography className={classes.typography1}>
                    7.Your present country of citizenship
                    <FormGroup className={classes.formgroup1}>
                    {[''].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            required
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>       
                </Typography>                
                <Typography className={classes.typography1}>
                    8.Your current residential address<br />
                    <b>Note:</b> A post office box address is not acceptable as a residential address
                    <FormGroup className={classes.formgroup1}>
                    {['','','','Postcode'].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>       
                </Typography>
                <Typography className={classes.typography1}>
                    9.Address for correspondence<br />
                    <i>(If the same as your residential address, write ‘AS ABOVE’)</i>
                    <FormGroup className={classes.formgroup1}>
                    {['','','','Postcode'].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>       
                </Typography>
                <Typography className={classes.typography1}>
                    10.Your telephone numbers
                    <FormGroup className={classes.formgroup1}>
                    {['Office hours','After hours'].map(item=>(
                        <div>
                            {item}
                            <TextField
                            id="standard-required"
                            label='Country code'
                            margin="normal"/>
                            <TextField
                            id="standard-required"
                            label='Area code'
                            margin="normal"/>
                            <TextField
                            id="standard-required"
                            label='Number'
                            margin="normal"/>
                        </div>
                    ))}
                    </FormGroup>       
                </Typography>
                <Typography className={classes.typography1}>
                    11.Do you agree to the Department communicating with you by fax, email or other electronic means?
                    <FormGroup className={classes.formgroup1}>
                    {['No','Yes & Giv details'].map(item=>(
                        <FormControlLabel
                        control={<Checkbox 
                            // checked={gilad} 
                            // onChange={handleChange('gilad')} 
                            color='primary'
                            labelPlacement="right"
                            value={item} />}
                        label={item} />
                    ))}
                    </FormGroup>       
                </Typography>                
                <Typography className={classes.typography2}>
                    <FormGroup className={classes.formgroup1}>
                        <FormControlLabel
                        control={<div>
                            Fax Number
                            <TextField
                            id="standard-required"
                            label='Country code'
                            margin="normal"/>
                            <TextField
                            id="standard-required"
                            label='Area code'
                            margin="normal"/>
                            <TextField
                            id="standard-required"
                            label='Number'
                            margin="normal"/>
                        </div>}
                        />
                        <FormControlLabel
                        control={<div>
                            Email address
                            <TextField
                                id="standard-required"
                                label='Email address'
                                margin="normal"/>
                            </div>                                
                        }>
                        </FormControlLabel>
                    </FormGroup>       
                </Typography>
                <Typography className={classes.typography1}>
                    12.Client number or file number issued to you by the Department <i>(if known)</i>
                    <FormGroup className={classes.formgroup1}>
                    {[''].map(item=>(
                        <FormControlLabel
                        control={
                            <TextField
                            required
                            id="standard-required"
                            label={item}
                            className={classes.textField}
                            margin="normal"/>
                        }
                    />
                    ))}
                    </FormGroup>       
                </Typography>
                <Divider variant="middle" />                
                    <Button variant="contained" color='primary' className={classes.backButton}>Save My Info</Button>
                    <Button variant="contained" color='secondary'  className={classes.backButton}>Export PDF</Button>
                <Divider variant="middle" />                
            </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
            <Button onClick={handleReset}>Reset</Button>
        ) : (
            <Paper className={classes.instructions}>{getStepContent(activeStep)}</Paper>
        )}
      </div>
      
    </div>
  );
}