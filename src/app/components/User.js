import React, { useContext, useEffect,useState } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Avatar } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ShopHandeler } from '../LocalDB/ShopDB'
import { useForm } from '../components/useForm'
import Notification from "../components/Notification";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(0),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        padding: 0
    },
    content: {
        padding: 8,
        margin: 0
    },
    paper: {
        ...theme.GlobalBox,
        margin: theme.spacing(4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 300
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function User(props) {
    const { current, chengeUserDetails } = useContext(ShopHandeler)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { title, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    const initialFValues = {
        username: '',
        password: '',
        Repassword: ''

    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length > 7 ? "" : "Minimum Length 8."
        if ('Repassword' in fieldValues)
            temp.Repassword = fieldValues.Repassword === fieldValues.password ? "" : "Password Not Match."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        // resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit =  e => {
        e.preventDefault()
        if (validate()) {
            chengeUserDetails({ username: values.username, password: values.password }).then(() => {
                setNotify({
                    isOpen: true,
                    message: ` Update Successfully`,
                    type: 'success'
                })
                setOpenPopup(false)
            })
        }
    }

    useEffect(() => {
        setValues({
            ...current,
            password: '',
            Repassword: ''
        })
    }, [current, setValues])

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, margin: 5 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon fontSize="inherit" />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers className={classes.content}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Chenge User Details
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>

                        <Controls.Input
                            name="username"
                            label="New User Name"
                            type='text'
                            size="small"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={values.username}
                            error={errors.username}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="password"
                            label="New Password"
                            type="password"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={values.password}
                            error={errors.password}
                            onChange={handleInputChange}

                        />
                        <Controls.Input
                            name="Repassword"
                            label="Re Enter Password"
                            type="password"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={values.Repassword}
                            error={errors.Repassword}
                            onChange={handleInputChange}

                        />
                        <Controls.Button
                            type="submit"
                            fullWidth
                            text="Submit"
                            className={classes.submit}
                        />
                    </form>
                </div>
            </DialogContent>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </Dialog>
    )
}


//onSubmit={handleSubmit}