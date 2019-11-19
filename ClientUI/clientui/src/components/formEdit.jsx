import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const apiurl=(func)=>{
    return `http://localhost:5000/api/${func}`
}
export default class FormEditComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            activeStep:0,
            filelist:[],
            pages:[],
            fileid:'',
            pageindex:'',
            form3data:{},
            steps:['Select File', 'Select Page', 'Edit information or export pdf']
        }
        this.loadFiles();
    }

    loadFiles = () => {
        fetch(apiurl('form'))
        .then(rsp=>rsp.json())
        .then(data=>this.setState({filelist:data}))
        .catch(error=>console.error('Fetch file list error:',error));
    }

    openFile=(fileid)=>{
        if(fileid!=='1022')
            return;
        fetch(apiurl(`form/${fileid}`))
        .then(rsp=>rsp.json())
        .then(data=>{
            var pages = [];
            for(var i=0;i<data;i++)
                pages.push(i+1);
            this.setState({fileid:fileid,pages:pages},()=>{
                this.handleNext();
            });
        })
        .catch(error=>console.error('Open file error:',error));
    }

    openPage=(page)=>{
        if(page!==3)
            return;
        fetch(apiurl(`form/${this.state.fileid}/${page}`))
        .then(jsp=>jsp.json())
        .then(data=>{
            var form3data = {};
            data.forEach(o => {
                form3data[o.key] = o.value;
            });
            this.setState({form3data:form3data,pageindex:page},()=>{
                this.handleNext();
            });
        })
        .catch(error=>console.error('Open page error:', error));
    }

    f3 =(key)=>{
        var v = this.state.form3data[key];
        return v===null?'':v;
    }
    s3 = (key,value)=>{
        const {form3data} = this.state;
        form3data[key] = value;
        this.setState({form3data});
    }

   getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <List component="nav">
          {this.state.filelist.map(file =>(
              <ListItem button key={`file-${file}`} onClick={event => this.openFile(file)}>
              <ListItemIcon>
                  <ListAltIcon fontSize='large' color={file==='1022'?'primary':'secondary'} />
              </ListItemIcon>
              <ListItemText
                  primary={`File ${file}`}
                  secondary={file==='1022' && 'Click here...'}
              />
              </ListItem>
          ))}
          </List>);
      case 1:
        return (
          <List  component="nav">
              <ListItem button onClick={this.handleBack}>
                  <ListItemIcon>
                    <ArrowBackIcon fontSize='large' color='primary' />
                  </ListItemIcon>
                  <ListItemText 
                    primary='Back to File List'
                  />
              </ListItem>
          {this.state.pages.map(page =>(
              <ListItem button key={`page-${page}`} onClick={event=>this.openPage(page)}>
              <ListItemIcon>
                  <InsertDriveFileOutlinedIcon  fontSize='large' color={page===3?'primary':'secondary'} />
              </ListItemIcon>
              <ListItemText
                  primary={`Page ${page}`}
                  secondary={page===3 && 'Click here...'}
              />
              </ListItem>
          ))}
          </List>);
      case 2:
        return (
            <div>
                <List  component="nav">
                    <ListItem button onClick={this.handleBack}>
                        <ListItemIcon>
                            <ArrowBackIcon fontSize='large' color='primary' />
                        </ListItemIcon>
                        <ListItemText 
                            primary='Back to File List'
                        />
                    </ListItem>
                </List>
                <div className='typography1'>
                    1. Your Full Name    
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.name.fam',title:'Family Name'},
                        {key:'ap.name.giv',title:'Given Names'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal"
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>
                </div>
                <div className='typography1'>
                    2. Date of birth
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.dob',title:'Birthday'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal" type="date"
                            label={item.title}
                            defaultValue="2017-05-24"
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>                    
                </div>
                <div className='typography1'>
                    3. Place of birth
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.birth.town',title:'Town/city'},
                        {key:'ap.birth.cntry',title:'Country'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal"
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>                  
                </div>
                <div className='typography1'>
                    4. Relationship status
                    <FormGroup className='formgroup1'>
                    {[
                        {key:'ap.marital.mar',title:'Married'},
                        {key:'ap.marital.eng',title:'Engaged'},
                        {key:'ap.marital.daf',title:'De facto'},
                        {key:'ap.marital.sep',title:'Separated'},
                        {key:'ap.marital.div',title:'Divorced'},
                        {key:'ap.marital.wid',title:'Widowed'},
                        {key:'ap.marital.nev.mar',title:'Never married or been in a de facto relationship'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<Checkbox 
                            checked={this.f3(item.key)==='yes'} 
                            onChange={e=>this.s3(item.key,e.target.checked?'yes':'no')} 
                            color='primary' />}
                        label={item.title}
                    />
                    ))}
                    </FormGroup>
                </div>
                <div className='typography1'>
                    5. Details from your passport
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.pass.no',title:'Passport number'},
                        {key:'ap.pass.cntry',title:'Country of passport'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal"
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>       
                </div>
                <div className='typography1'>
                    6. Details of identity card or identity number issued to you by your government (if applicable) eg. National identity card.<br />
                    <b>Note:</b> If you are the holder of multiple identity numbers because you are a citizen of more than one country, you need to enter the identity number on the card from the country that you live in.
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.ident.no',title:'Identity number'},
                        {key:'ap.ident.cntry',title:'Country of issue'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal"
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>       
                </div>
                <div className='typography1'>
                    7. Your present country of citizenship
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.cit',title:'Identity number'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal"
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>       
                </div>                
                <div className='typography1'>
                    8. Your current residential address<br />
                    <b>Note:</b> A post office box address is not acceptable as a residential address
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.resi.str',title:'Street'},
                        {key:'ap.resi.sub',title:'Sub'},
                        {key:'ap.resi.cntry',title:'Country'},
                        {key:'ap.resi.pc',title:'Postcode'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal"
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>       
                </div>
                <div className='typography1'>
                    9. Address for correspondence<br />
                    <i>(If the same as your residential address, write ‘AS ABOVE’)</i>
                    <FormGroup className='formgroup1'>
                    {
                    [
                        {key:'ap.corresp.str',title:'Street'},
                        {key:'ap.corresp.sub',title:'Sub'},
                        {key:'ap.corresp.cntry',title:'Country'},
                        {key:'ap.corresp.hap',title:'Postcode'}
                    ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField className='textField' margin="normal"
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />
                    ))}
                    </FormGroup>       
                </div>
                <div className='typography1'>
                    10. Your telephone numbers
                    <FormGroup className='formgroup1'>
                        <div>
                            Office hours
                            {
                                [
                                    {key:'ap.off.ph.cc',title:'Country code'},
                                    {key:'ap.off.ph.ac',title:'Area code'},
                                    {key:'ap.off.ph',title:'Number'}
                                ].map(item=>(
                                    <FormControlLabel key={item.key}
                                    control={<TextField margin="normal"
                                        label={item.title}
                                        value={this.f3(item.key)}
                                        onChange={e=>this.s3(item.key,e.target.value)}
                                        />}
                                    />
                            ))}                        
                        </div>
                    <div>
                        After hours
                        {
                            [
                                {key:'ap.after.ph.cc',title:'Country code'},
                                {key:'ap.after.ph.ac',title:'Area code'},
                                {key:'ap.after.pn',title:'Number'}
                            ].map(item=>(
                                <FormControlLabel key={item.key}
                                control={<TextField margin="normal"
                                    label={item.title}
                                    value={this.f3(item.key)}
                                    onChange={e=>this.s3(item.key,e.target.value)}
                                    />}
                                />
                        ))}                        
                    </div>
                    </FormGroup>       
                </div>
                <div className='typography11'>
                    11. Do you agree to the Department communicating with you by fax, email or other electronic means?
                    <FormGroup className='formgroup1'>
                        {
                        [
                            {key:'ap.com.dimia',title:'Country code'}
                        ].map(item=>(
                        <RadioGroup key={item.key}
                            value={this.f3(item.key)} 
                            onChange={e=>this.s3(item.key,e.target.value)}>
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                            <FormControlLabel value="yes" control={<Radio />} label="Yes, Giv Details" />
                        </RadioGroup>
                        ))}
                    </FormGroup>       
                </div>                
                <div className='typography2'>
                    <FormGroup className='formgroup1'>
                    <div>
                        Fax number
                        {
                            [
                                {key:'ap.fax.cc',title:'Country code'},
                                {key:'ap.fax.ac',title:'Area code'},
                                {key:'ap.fax.ph',title:'Number'}
                            ].map(item=>(
                                <FormControlLabel key={item.key}
                                control={<TextField margin="normal"
                                    label={item.title}
                                    value={this.f3(item.key)}
                                    onChange={e=>this.s3(item.key,e.target.value)}
                                    />}
                                />
                        ))}                        
                    </div>
                    <div>
                        Email address
                        {
                            [
                                {key:'ap.email',title:'Email address'}
                            ].map(item=>(
                                <FormControlLabel key={item.key}
                                control={<TextField margin="normal"
                                    label={item.title}
                                    value={this.f3(item.key)}
                                    onChange={e=>this.s3(item.key,e.target.value)}
                                    />}
                                />
                        ))} 
                    </div>                          
                    </FormGroup>       
                </div>
                <div className='typography1'>
                    12. Client number or file number issued to you by the Department <i>(if known)</i>
                    <FormGroup className='formgroup1'>
                    {
                        [
                            {key:'ap.file.no',title:'File Management'}
                        ].map(item=>(
                        <FormControlLabel key={item.key}
                        control={<TextField margin="normal" className='textField'
                            label={item.title}
                            value={this.f3(item.key)}
                            onChange={e=>this.s3(item.key,e.target.value)}
                            />}
                        />))
                    }
                    </FormGroup>       
                </div>
                <center>
                    <Button variant="contained" color='primary' className='backButton' onClick={e=>{
                        var url = apiurl(`form/${this.state.fileid}/${this.state.pageindex}`);
                        fetch(url,{
                            method:'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.state.form3data)
                        })
                        .then(jsp=>jsp.json())
                        .then(data=>console.log(data));
                    }}>Save My Info</Button>
                    <Button variant="contained" color='secondary'  className='backButton' onClick={e=>{
                        var url = apiurl(`download/${this.state.fileid}/${this.state.pageindex}`);
                        window.open(url);
                    }}>Export PDF</Button>
                </center>
            </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  };

    handleNext = () => {
    const {activeStep} = this.state;
    this.setState({activeStep:activeStep+1});
  };

 handleBack = () => {
    const {activeStep} = this.state;
    this.setState({activeStep:activeStep-1});
  };

  render(){
    const {activeStep,steps} = this.state;
    return (
        <div className='root'>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
                <Button onClick={this.handleReset}>Reset</Button>
            ) : (
                <Paper className='instructions'>{this.getStepContent(activeStep)}</Paper>
            )}
          </div>
          
        </div>
    )
  }
}