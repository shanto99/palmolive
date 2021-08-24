import axios from "axios";
import swal from "sweetalert";

const CostHeadManagement = {
  getCostHeads: function(callback) {
    axios.get("/palmolive/cost-heads").then(res => {
      callback(res.data);
    })
  },

  getCostSubHead: function(headId, callback, isGoal)
  {
      let url = `/palmolive/cost-sub-heads/${headId}`;
      if(isGoal) url = `/palmolive/cost-sub-heads/${headId}/1`;
    axios.get(url).then(res => {
      callback(res.data);
    })
  }
};


export default CostHeadManagement;
