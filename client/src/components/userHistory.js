import React from 'react';
import {connect} from 'react-redux';

export class UserHistory extends React.Component {
    constructor (props) {
        super(props);
    }

render() {
    console.log('rendered!!');
const results = Object.keys(this.props.scoreTotals).map((item, index) => {
            let quizPercentage = this.props.scoreTotals[item][0] / this.props.scoreTotals[item][1];
            return  <div key={index} className='resultItem'>
                    <h2>{item}</h2>
                    <p><b>{(quizPercentage * 100).toFixed(0) }%</b> or <b>{this.props.scoreTotals[item][0]}/{this.props.scoreTotals[item][1]}</b> questions</p>                    
                </div>
            });

return (
    <div>
        {results}
    </div>
)
    }
}



const mapStateToProps = state => ({
  scoreTotals: state.scoreTotals,
  scoreTracker: state.scoreTracker
});

export default connect(mapStateToProps)(UserHistory);
