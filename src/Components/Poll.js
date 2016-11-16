import React from 'react';

import { OverlayTrigger, Popover } from 'react-bootstrap';
import PLConstance from '../Utils/Constance';

export default (props) => {

    const data = props.pollData;
    const numOfChoicesPerRow = 2;

    // console.log("In polling", data);
    const pollTitle = data.title || "Loading...";

    let pollChoices;
    if(data.choices) {
        pollChoices = data.choices.map((choice, idx) => {

            const btnStyle = {
                backgroundImage: 'url(' + data.imgURLs[idx] + ')',
                backgroundSize: '100px 100px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(0,0,0,0)',
                height: '100px',
                width: '100%'
            };

            const popOverStyle = {
                backgroundImage: 'url(' + data.imgURLs[idx] + ')',
                backgroundSize: '150px 150px',
                backgroundPosition: '25px 40px',
                backgroundRepeat: 'no-repeat',
                height: '200px',
                width: '200px',
            };

            const didClickBtn = (idx) => {
                props.submitPoll(idx)
            };

            return (
                <div className={'col-xs-' + `${12 / numOfChoicesPerRow}`} key={choice}>
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement={props.placement || "bottom"}
                        overlay={
                            <Popover
                                id={choice}
                                title={ 'Vote for ' + choice }
                                style={ popOverStyle }
                            />
                        }
                    >
                        <button
                            type="button"
                            style={ btnStyle }
                            onClick={didClickBtn.bind(this, idx)}
                        />
                    </OverlayTrigger>
                </div>
            )
        });
    }

    let tempArr = [];
    let rows = [];
    if(pollChoices) {
        pollChoices.forEach((choice, idx) => {
            tempArr.push(choice);
            if((idx + 1) % numOfChoicesPerRow === 0 || (idx + 1)  === pollChoices.length) {
                rows.push(
                    <div className="col-xs-12" key={idx}>
                        {tempArr}
                    </div>
                );
                tempArr = [];
            }
        });
    }

    return props.hidden ? null : (
        <div id={PLConstance.styles.ids.pollPage}>
            <h4>
                {pollTitle}
            </h4>

            <div id={PLConstance.styles.ids.pollChoices}>
                {rows}
            </div>
        </div>
    );
}