import React, { Component } from 'react';
import {Route,Link} from "react-router-dom";
import Course from '../Course/Course';
import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 664, title: 'Database Application' },
            { id: 539, title: 'Complex Web Development' },
            { id: 631, title: 'Content Management System' }
        ]
    }
   
    render () {
        return (
            <div>
                <h1>Amazing SI Courses</h1>
                <section className="Courses">
                    {this.state.courses.map( course => {
                        return (
                            <Link  
                                key={course.id} 
                                to={{
                                    pathname:this.props.match.url+'/'+course.id,
                                    search:'?title='+course.title
                                }}
                            ><p className="Course">{course.title}</p>
                            </Link>
                        );
                    } )}
                </section>
                <hr />
                <Route path={this.props.match.url+'/:courseId'} component={Course}/>
            </div>
        );
    }
}

export default Courses;