import React from 'react';

export default class Header extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            topics: [
                'Hello World',
                'ANimals are Fun',
                'My name is Donald'
            ]
        }
    }


    render(){
        const topics = this.state.topics.map((topic, index) => (
            <li key={index}>
                <button className='topic-button' value={topic}>{topic}</button>
            </li>  
        ));
        return (
            <section className="header">
                <h1> Quiz App </h1>
                <ul id ='topic-list'>
                    {topics}
                </ul>
            </section>
        )
    }
}