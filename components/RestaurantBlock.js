import React from 'react';
import { Grid } from '@mui/material';
import utility from './utility';


export default function RestaurantBlock(props) {
    return (
    <Grid item m={12}>
        <div>
        <img src={props.image} width="200" height="170"></img>
        </div>
        <div>{props.name}</div>
        <div>{utility.priceratingfunction(props.pricerating)} {props.tags}</div>
        <div>{utility.reviewfunction(props.rating)}/5</div>
    </Grid>
    )
}


/*ruuan hinta tallennetaan numerona 0-5
ftio joka muuttaa tämän oikeaksi määräksi euroja/dollareita

rating arvo int, jaa kymmenellä

*/

