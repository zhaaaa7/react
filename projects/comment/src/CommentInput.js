import React, {Component} from 'react';


class CommentInput extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            content:''
        };
    }

    componentWillMount(){
        this._loadUsername();
    }

    componentDidMount(){
        this.input.focus();
    }

    _saveUsername=(name)=>{
        localStorage.setItem('username',name);
    }
    _loadUsername=()=>{
        const username=localStorage.getItem('username');
        if(username){
            this.setState({username});
        }
    }
    

    handerUsernameChange=(e)=>{
        this.setState({username:e.target.value});
    }

    handerContentChange=(e)=>{
        this.setState({content:e.target.value});
    }

    handleSubmit=()=>{
        if(this.props.onSubmit){
            const {username, content}=this.state; //destructuring so the state is not directly modified
            this.props.onSubmit({
                username:username,
                content:content,
                createdTime: +new Date()
            });
        }
        this.setState({content:''});
    }

    

    handleUsernameBlur=(e)=>{
        this._saveUsername(e.target.value);
    }


    

    render(){
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>User Name：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username}
                               onChange={this.handerUsernameChange}
                               ref={input=>this.input=input}
                               onBlur={this.handleUsernameBlur}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>Comment：</span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.content}
                                  onChange={this.handerContentChange} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit}>
                        Publish
                    </button>
                </div>
            </div>
        );
    }
}

export default CommentInput;