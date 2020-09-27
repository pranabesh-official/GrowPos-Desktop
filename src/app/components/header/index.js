import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Typography } from '@material-ui/core';
import Controls from '../controls/Controls'
import AddIcon from '@material-ui/icons/Add';
import Discount from '../../views/Pos/OrderPane/BillingDetails/Discount'
import Popup from '../Popup'
import { connect } from 'react-redux'
import { BillingDetails } from '../../store/action/Cart'
import CIcon from '@coreui/icons-react'
const useStyles = makeStyles((theme) => ({
    root: (props) => {
        return {
            ...theme.GlobalBox,
            maxWidth: '100%',
            padding: '0 0px',
            height: `${props.height}px`
        }
    },
    avatar: (props) => {
        return {
            backgroundColor: '#00000000',
            hiight: `${props.height - 2}px`,
            width: `${props.height - 2}px`
        }
    },
    header: (props) => {
        return {
            height: `${props.height}px`
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
    },
    newButton: {
        position: 'absolute',
        top: 2,
        right: 8
    },

}));

const Header = (props) => {
    const classes = useStyles(props);
    const { title, subtitle, src } = props
    const [openPopup, setOpenPopup] = useState(false)

    const AddDiscount = () => {
        props.BillingDetails('discount', true)
        setOpenPopup(true)
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <CIcon name="cashRegister" height="28" alt="Logo"/>
                }

                title={<Typography variant='body1' className={classes.heading} >{title.toUpperCase()}</Typography>}
                subheader={<Typography variant='body2' className={classes.secondaryHeading} >{subtitle.toUpperCase()}</Typography>}
                className={classes.header}
            />
            <Controls.Button
                text="Add Discount"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => AddDiscount(true)}
            />

            <Popup
                // title={"Tax"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Discount setOpenPopup={setOpenPopup} />
            </Popup>
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        Cart: state.Cart,
    }
}
export default connect(mapStateToProps, { BillingDetails })(Header);