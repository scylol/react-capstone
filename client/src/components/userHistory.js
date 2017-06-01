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
            return  <li key={index} className='resultItem'>
                    <h1>{item}</h1>
                    <p>{this.props.scoreTotals[item][0]}/{this.props.scoreTotals[item][1]}</p>
                    <p>{quizPercentage * 100 }%</p>
                </li>
            });

return (
    <div>
        {results}
    </div>
)
    }
}



const mapStateToProps = state => ({
  scoreTotals: state.scoreTotals
});

export default connect(mapStateToProps)(UserHistory);
