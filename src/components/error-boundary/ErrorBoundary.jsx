import React, { Component} from 'react'

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
            return (
                <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
                    <div>
                        <h2 className="text-3xl font-semibold leading-tight text-red-800"> Oops ! ! !</h2>
                        <h6 className="">kindly report problem to the developers at FinTech ( +233 20 757 3792 ) </h6>
                    </div>
                    <div className="flex justify-center">
                        <div className="mb-4  w-1/2">
                            <img src="/assets/support.png" alt="Could not load SVG"/>
                        </div>
                    </div>
                </div>
            )
        }
         return this.props.children
    }
}