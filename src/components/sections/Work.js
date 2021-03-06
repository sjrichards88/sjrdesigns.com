import React, { Component } from 'react'
import {
    isMobile
} from "react-device-detect";

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
            itemActive: -1,
            items: [
                {
                    title: 'Pophouse Hotel',
                    image: imgPopHouse,
                    url: 'https://pophouse.se/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'King Tut Exhibition',
                    image: imgKingTut,
                    url: 'https://kingtutexhibition.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Abba the Museum',
                    image: imgABBA,
                    url: 'https://abbathemuseum.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Just Dance Live',
                    image: imgJDL,
                    url: 'https://justdancelive.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Mamma Mia The Party',
                    image: imgMMTP,
                    url: 'https://mammamiatheparty.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Five Guys Named Moe',
                    image: imgFGNM,
                    url: 'https://www.fiveguysmusical.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Sheikh Jaber Al-Ahmad Cultural Centre',
                    image: imgJacc,
                    url: 'https://jacc-kw.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Bat Out Of Hell',
                    image: imgBOOH,
                    url: 'https://batoutofhellmusical.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Marisha Wallace Soul Holiday',
                    image: imgSoul,
                    url: 'https://soulholidayalbum.com/',
                    note: 'developed at Dewynters'
                },
                {
                    title: 'Bouquets & Bows',
                    image: imgBows,
                    url: '',
                    note: 'coming soon'
                },
            ]
        }

        this.workTrigger = this.workTrigger.bind(this)
    }

    openTab(url) {
        if (url) {
            const win = window.open(url, '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus()
            }
        }
    }

    workTrigger(e) {
        e.preventDefault()
        const url = e.currentTarget.href
        const { itemActive } = this.state
        if (isMobile) {
            const key = e.currentTarget.getAttribute('data-key')
            if (itemActive !== key) {
                this.setState({
                    itemActive: key
                })
            } else {
                this.openTab(url)
            }
        } else {
            this.openTab(url)
        }
    }

    render() {

        let { itemActive } = this.state
        itemActive = parseInt(itemActive)

        const workItems = this.state.items.map( (item, i) => {

            if (item.url === '') {
                return (
                    <div className={`work__block ${itemActive === i ? 'active' : ''}`} key={i} data-key={i} onClick={this.workTrigger}>
                        <img src={item.image} className="work__block-image" alt={`${item.title} website`} />
                        <div className="work__block-content">
                            <h3>{item.title}</h3>
                            <span className="work__block-smallprint">{item.note}</span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <a href={item.url} className={`work__block ${itemActive === i ? 'active' : ''}`} key={i} data-key={i} onClick={this.workTrigger}>
                        <img src={item.image} className="work__block-image" alt={`${item.title} website`} />
                        <div className="work__block-content">
                            <h3>{item.title}</h3>
                            <span className="work__block-smallprint">{item.note}</span>
                            <div className="work__block-icon">
                                <i className="icon icon-forward" aria-hidden="true"></i>
                            </div>
                        </div>
                    </a>
                )
            }
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
