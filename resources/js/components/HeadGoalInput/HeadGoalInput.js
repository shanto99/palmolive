import React from "react";
import HeadInput from "../HeadInput/HeadInput";

class HeadGoalInput extends React.Component
{
    componentDidMount() {
        console.log("goal");
    }

    render() {
       return (
           <HeadInput isInputTypeGoal={true}/>
           )
   }
}

export default HeadGoalInput;
