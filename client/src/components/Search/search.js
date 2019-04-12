import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { doSearch } from '../../actions/user_actions';

class Search extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            keywords: {
                element: 'input',
                value: '',
                config:{
                    name: 'keywords_input',
                    type: 'keywords',
                    placeholder: 'To begin, enter a Title or Pubmed ID (PMID) below.'
                },
                validation:{
                    required: true,
                    keywords: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'search');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login');


        if(formIsValid){
            this.props.dispatch(doSearch(dataToSubmit)).then(response =>{
                if(response.payload){
                    let val=response.payload;
                    this.props.history.push({pathname:'/recommend',state:{val}})
                }else{
                    this.setState({
                        formError: true
                    })
                }
            });

        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormField
                        id={'keywords'}
                        formdata={this.state.formdata.keywords}
                        change={(element)=> this.updateForm(element)}
                    />


                    { this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                    :null}
                    <button className="card_link" onClick={(event)=> this.submitForm(event)}>
                        Go
                    </button>
                </form>
            </div>
        );
    }
}

export default  withRouter(connect()(Search));








    


                

