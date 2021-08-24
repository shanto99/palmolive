import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";

import Helpers from "../../Helpers/DateHelpers";

import CostHeadManagement from "../../API/CostHeadManagement";
import HeadInputManagement from "../../API/HeadInputManagement";


class HeadInput extends React.Component {
  constructor(props)
  {
    super(props);
    this.inputsContainer = React.createRef();
    let date = new Date();
    let firstDayOfYear = new Date(date.getFullYear(), 0 ,1);
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 1);
    this.state = {
      costHeads: [],
      costSubHeads: [],
      selectedHead: "",
      selectedSubHead: "",
      startPeriod: props.isInputTypeGoal ? firstDayOfYear : firstDayOfMonth,
      endPeriod: props.isInputTypeGoal ? firstDayOfYear : firstDayOfMonth,
      inputPeriods: [firstDayOfMonth]
    };
    this.selectCostHead = this.selectCostHead.bind(this);
    this.selectCostSubHead = this.selectCostSubHead.bind(this);
    this.selectStartPeriod = this.selectStartPeriod.bind(this);
    this.selectEndPeriod = this.selectEndPeriod.bind(this);
    this.generateInputs = this.generateInputs.bind(this);
    this.submitUserInputs = this.submitUserInputs.bind(this);
    this.getPreviousInputs = this.getPreviousInputs.bind(this);
    this.formatPeriodLabel = this.formatPeriodLabel.bind(this);
  }

  componentDidMount()
  {
    CostHeadManagement.getCostHeads((costHeads) => {
      this.setState({
        costHeads: costHeads
      });
    });
  }


  selectStartPeriod(date)
  {
    this.setState({
      startPeriod: date
    }, () => {
        this.generateInputs();
        this.getPreviousInputs();
    });
  }

  selectEndPeriod(date)
  {
    this.setState({
      endPeriod: date
    }, () => {
        this.generateInputs();
        this.getPreviousInputs();
    });
  }

  selectCostHead(e)
  {
    let value = e.target.value;

    CostHeadManagement.getCostSubHead(value, (subHeads) => {
      this.setState({
        selectedHead: value,
        costSubHeads: subHeads
      });
    }, this.props.isInputTypeGoal);

  }

  selectCostSubHead(e) {
    let value = e.target.value;
    this.setState({
      selectedSubHead: value
    }, this.getPreviousInputs);
  }

  getPreviousInputs(){
    let { selectedHead, selectedSubHead, startPeriod, endPeriod } = this.state;
    HeadInputManagement.getHeadInputs(selectedHead, selectedSubHead, startPeriod, endPeriod, this.props.isInputTypeGoal, (values) =>{
        let previousInputs = {};
        values.forEach(preInput => {
            let period = this.props.isInputTypeGoal ? preInput.Year : preInput.Period;
            previousInputs[period] = Number.parseFloat(preInput.Value).toFixed(2);
        });

        let inputs = [...this.inputsContainer.current.querySelectorAll('input')];

        inputs.forEach(inputElm => {
           let period = inputElm.dataset.date;
           if(previousInputs[period]) {
               inputElm.value = previousInputs[period];
           } else {
               inputElm.value = "";
           }
        });
    });
  }

  generateInputs()
  {
    let betweenPeriods = [];
    if(this.props.isInputTypeGoal)
    {
        betweenPeriods = Helpers.getBetweenYears(this.state.startPeriod, this.state.endPeriod);
    } else {
        betweenPeriods = Helpers.getBetweenMonths(this.state.startPeriod, this.state.endPeriod);
    }

    this.setState({
      inputPeriods: betweenPeriods
    });
  }

  formatDateToInputLabel(date)
  {
      if(this.props.isInputTypeGoal) return date.getFullYear();
    return `${date.getMonth()+1}/${date.getFullYear()}`;
  }


  submitUserInputs(e)
  {
    e.preventDefault();
    let inputs = [];
    let inputFields = [...this.inputsContainer.current.querySelectorAll('input')];
    for(const inputField of inputFields) {
      let date = inputField.dataset.date;
      let value = inputField.value;

      if(date && value) {
        inputs.push({date, value});
      } else {
        swal("Error", "All inputs are required!", "warning");
        return;
      }
    }

    HeadInputManagement.saveHeadInput(this.state.selectedHead, this.state.selectedSubHead, inputs, this.props.isInputTypeGoal, () => {
        swal("Success", "Input values inserted successfully!!", "success");
    });

  }

  formatPeriodLabel(period)
  {
      if(this.props.isInputTypeGoal) {
          return `${period.getFullYear()}-01-01`;
      }
      let monthString = period.getMonth()+1;
      monthString = monthString.toString();
      if(monthString.length < 2) monthString = '0'+monthString;

      return `${period.getFullYear()}-${monthString}-01`;
  }

  render() {

    const subHeads = this.state.costSubHeads;

    const inputPeriods = this.state.inputPeriods;

    return (
        <React.Fragment>
            <header className="page-header">
                <h2>{this.props.isInputTypeGoal ? 'Input goals' : 'Input head values'}</h2>
            </header>
            <div className="row">
                <div className="col-lg-8">
                    <section className="card">
                        <header className="card-header">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="form-group row">
                                        <label className="col-sm-12 control-label text-sm-left pt-2">Select head</label>
                                        <div className="col-sm-12">
                                            <select value={this.state.selectedHead} onChange={this.selectCostHead} className="form-control">
                                                <option value="">Select a cost head</option>
                                                {this.state.costHeads.map(head => {
                                                    return (<option key={head.HeadID} value={head.HeadID}>{head.HeadName}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group row">
                                        <label className="col-sm-12 control-label text-sm-left pt-2">Select sub head</label>
                                        <div className="col-sm-12">
                                            <select className="form-control" value={this.state.selectedSubHead} onChange={this.selectCostSubHead}>
                                                <option>Select a cost sub head</option>
                                                {subHeads.map((head) => {
                                                    return (<option key={head.SubHeadID} value={head.SubHeadID}>{head.SubHeadName}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="row form-group">
                                        <label className="col-sm-12 control-label text-sm-left pt-2">Select start</label>
                                        {this.props.isInputTypeGoal
                                            ? <DatePicker
                                                dateFormat="yyyy"
                                                className="form-control"
                                                selected={this.state.startPeriod}
                                                onChange={this.selectStartPeriod}
                                                showYearPicker={true}
                                            />
                                            : <DatePicker
                                                dateFormat="MM/yyyy"
                                                className="form-control"
                                                selected={this.state.startPeriod}
                                                onChange={this.selectStartPeriod}
                                                showMonthYearPicker={true}
                                            />}

                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="row form-group">
                                        <label className="col-sm-12 control-label text-sm-left pt-2">Select end</label>
                                        {this.props.isInputTypeGoal
                                            ? <DatePicker
                                                dateFormat="yyyy"
                                                className="form-control"
                                                selected={this.state.endPeriod}
                                                onChange={this.selectEndPeriod}
                                                showYearPicker={true}
                                            />
                                            : <DatePicker
                                                dateFormat="MM/yyyy"
                                                className="form-control"
                                                selected={this.state.endPeriod}
                                                onChange={this.selectEndPeriod}
                                                showMonthYearPicker={true}
                                            />}

                                    </div>
                                </div>

                            </div>
                        </header>

                        <div className="card-body">
                            <div className="row user-inputs" ref={this.inputsContainer}>
                                {inputPeriods.map((period, index) => {
                                    return (
                                        <div className="col-lg-4" key={index}>
                                            <div className="form-group row">
                                                <label className="col-sm-6 control-label text-sm-left pt-2">{this.formatDateToInputLabel(period)}</label>
                                                <div className="col-sm-9">
                                                    <input type="text" data-date = {this.formatPeriodLabel(period)} className="form-control" required/>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success" onClick={this.submitUserInputs}>Save</button>
                        </div>
                    </section>
                </div>
            </div>
        </React.Fragment>

    )
  }
}


export default HeadInput;
