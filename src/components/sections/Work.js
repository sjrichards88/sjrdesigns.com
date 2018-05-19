import React, { Component } from 'react'

import imgPopHouse from '../../assets/images/pop-house.jpg'
import imgKingTut from '../../assets/images/king-tut.jpg'
import imgABBA from '../../assets/images/abba.jpg'
import imgJDL from '../../assets/images/just-dance-live.jpg'
import imgMMTP from '../../assets/images/mmtp.jpg'
import imgFGNM from '../../assets/images/fgnm.jpg'
import imgJacc from '../../assets/images/jacc.jpg'
import imgBOOH from '../../assets/images/booh.jpg'
import imgSoul from '../../assets/images/soul.jpg'
import imgBows from '../../assets/images/bows.jpg'

class Work extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [
                {
                    title: 'Pophouse Hotel',
                    image: imgPopHouse,
                    url: 'https://pophouse.se/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Pophouse Hotel',
                    image: imgPopHouse,
                    url: 'https://kingtutexhibition.com/',
                    note: 'developed at Dewynters'
                },
            ]
        }
    }

    render() {

        const workItems = this.state.items.map( item => {
            return (
                <a href={item.url} className="work__block" target="_blank" rel="noreferrer">
                    <img src={item.image} className="work__block-image" alt={`${item.url} website`} />
                    <div className="work__block-content">
                        <h3>{item.title}</h3>
                        <span className="work__block-smallprint">{item.note}</span>
                        <div className="work__block-icon">
                            <i className="icon icon-forward" aria-hidden="true"></i>
                        </div>
                    </div>
                </a>
            )
        });

        return (
            <section className="section work" id="work">
                <h2>work</h2>
                <div className="work__wrap">
                    {workItems}
                </div>
            </section>
        )
    }

}

export default Work
