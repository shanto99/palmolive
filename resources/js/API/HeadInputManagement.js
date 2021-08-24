import axios from "axios";
import Helpers from "../Helpers/DateHelpers";

const HeadInputManagement = {
  getHeadInputs: function(headId, subHeadId, startPeriod, endPeriod, isGoalInput, cb){
      startPeriod = Helpers.humanizedDateFormat(startPeriod);
      endPeriod = Helpers.humanizedDateFormat(endPeriod);
      let url = `/palmolive/get-head-inputs/${headId}/${subHeadId}/${startPeriod}/${endPeriod}`;
      if(isGoalInput){
          url = `/palmolive/get-goal-inputs/${headId}/${subHeadId}/${startPeriod}/${endPeriod}`;
      }
      axios.get(url).then(res => {
         cb(res.data);
      });
  },
  saveHeadInput: function(headId, subHeadId, inputs, isInputTypeGoal, cb)
  {
      let url = "/palmolive/save-head-inputs";
      if(isInputTypeGoal)
      {
          url = "/palmolive/save-goal-inputs"
      }
        axios.post(url, {
          headId: headId,
          subHeadId: subHeadId,
          inputs: inputs
        }).then(res => {
          cb();
        });
  }
};

export default HeadInputManagement;
