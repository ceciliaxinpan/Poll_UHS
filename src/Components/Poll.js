import React from 'react';

import { OverlayTrigger, Popover } from 'react-bootstrap';
import PLConstance from '../Utils/Constance';

export default (props) => {

    const data = props.pollData;

    console.log("In polling", data);
    const pollTitle = data.title || "Loading...";

    let pollChoices;
    if(data.choices) {
        pollChoices = data.choices.map((choice, idx) => {

            const btnStyle = {
                backgroundImage: 'url(' + data.imgURLs[idx] + ')',
                backgroundSize: 'cover',
                height: '60px',
                width: '60px',
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
                <div className='col-xs-3' key={choice}>
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement={props.placement || "bottom"}
                        overlay={
                            <Popover
                                id={choice}
                                title={ choice }
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

    return props.hidden ? null : (
        <div id={PLConstance.styles.ids.pollPage}>
            <h4>
                {pollTitle}
            </h4>

            <div className='col-xs-12'>
                {pollChoices}
            </div>
        </div>
    );
}