import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Container } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { toggleEditForm } from '../../redux/reducers/tasksSlice'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: green[500],
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    taskForm: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: "column",
    },
    textInput: {
        margin: '25px 0px',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const EditableTask = ({ open, id }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        status: false,
    })

    const [data, setData] = useState({
        name: '',
        description: '',
        status: ''
    })

    const handleConfirm = () => {
        let error = {}
        const detectErrors = Object.keys(data).map(key => {
            if (data[key].length === 0) {
                error[key] = true
                return true
            }
            else {
                error[key] = false
                return false
            }
        })
        if (detectErrors.find(el => el === true)) {
            setErrors(error)
        } else {
            setErrors({
                name: false,
                description: false,
                status: false,
            })
            dispatch(toggleEditForm())
        }
    }

    const handleChange = (event, field) => {
        setData({ ...data, [field]: event.target.value })
    }

    return (
        <Dialog fullScreen open={open} onClose={() => { }} TransitionComponent={Transition} >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => dispatch(toggleEditForm())}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {id ? "Изменить задание" : "Новое задание"}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleConfirm}>
                        Сохранить
                    </Button>
                </Toolbar>
            </AppBar>
            <Container className={classes.taskForm}>
                <TextField
                    className={classes.textInput}
                    id="task-name"
                    label="Название"
                    onChange={(e) => handleChange(e, 'name')}
                    error={errors.name}
                    value={data.name}
                    helperText={errors.name && 'Поле не должно быть пустым'}
                />
                <TextField
                    className={classes.textInput}
                    id="task-description"
                    label="Описание"
                    multiline
                    onChange={(e) => handleChange(e, 'description')}
                    error={errors.description}
                    value={data.description}
                    helperText={errors.description && 'Поле не должно быть пустым'}
                />
                <FormControl className={classes.textInput} error={errors.status}>
                    <InputLabel id="task-status">Состояние</InputLabel>
                    <Select
                        labelId="task-status"
                        id="task-status"
                        value={data.status}
                        onChange={(e) => handleChange(e, 'status')}
                    >
                        <MenuItem value={'В процессе'}>В процессе</MenuItem>
                        <MenuItem value={'Завершено'}>Завершено</MenuItem>
                    </Select>
                    <FormHelperText>{errors.status && 'Поле не должно быть пустым'}</FormHelperText>
                </FormControl>
            </Container>
        </Dialog >
    );
}