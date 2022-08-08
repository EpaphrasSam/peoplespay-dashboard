import React, { Component} from 'react'
import NotFound from '../views/404/NotFound';
export default class ErrorBoundary extends Component{
    
    constructor(){
        super();

        this.state = {
            hasErrored : false
        }
    }

    static getDerivedStateFromError(error){
        //process the error
        return {
            hasErrored : true
        }
    }

    componentDidCatch(error, info){
        console.log(error)
    }

    render(){
        if(this.state.hasErrored){
            return <NotFound/>      
        }
         return this.props.children
    }
}