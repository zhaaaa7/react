import React,{Component} from 'react';


class Comment extends Component{
    constructor(){
        super();
        this.state={timeString:''};
    }

    componentWillMount(){       
        this._updateTimeString();
        this._timer=setInterval(this._updateTimeString.bind(this),5000);
    }
    componentWillUnmount () {
        clearInterval(this._timer);
      }

    _updateTimeString(){
        const duration=(+Date.now()-this.props.comment.createdTime)/1000;
        this.setState({timeString:duration>60?`${Math.round(duration/60)} minutes ago`:`${Math.round(Math.max(duration,1))} seconds ago`});
    }

    _getProcessedContent (content) {
        return content
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }


    handleDeleteComment=()=>{
        if(this.props.onDeleteComment){
            console.log('[delete2]');
            this.props.onDeleteComment(this.props.index);
        }
    }

    render(){
        const {username,content}=this.props.comment;
        return (
            <div className='comment'>
                <div className='comment-user'><span>{username} </span>：</div>
                <p dangerouslySetInnerHTML={{
                __html: this._getProcessedContent(content)
                }} />
                <span className='comment-delete' onClick={this.handleDeleteComment}>Delete</span>
                <span className='comment-createdtime'>{this.state.timeString}</span>
            </div>
        );
    }
    
}

export default Comment;