import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/Task.module.scss'
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Collapse, IconButton, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateReport, updateTaskState } from '../../redux/reducers/tasksSlice';
import { UpdateTaskRequest } from '../../requests/Request';

export const Task = ({ data }) => {
    const [taskState] = useState({
        InProgress: "В процессе выполнения",
        Moderation: "Проверяется модерацией",
        Confirmed: "Выполнен",
        Declined: "Провален",
        Cancelled: "Отменен"
    })

    const dispatch = useDispatch()

    const parseDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }

    const [isSave, setIsSaved] = useState(data.report || false)

    const [expanded, setExpanded] = useState(false)

    const [reportData, setReportData] = useState({
        _id: data._id,
        report: data.report,
        images: ['test']
    })

    const [errors, setErrors] = useState({
        report: false,
        images: false
    })

    const handleExpandClick = () => {
        if (!expanded) {
            setReportData({
                _id: data._id,
                report: data.report,
                images: ['test']
            })
        }
        setExpanded(!expanded)
    }

    const handleCompleteTask = () => {
        const taskToUpdate = {
            _id: data._id,
            userId: data.user,
            challengeId: data.challenge._id,
            state: "Moderation",
            report: data.report,
            images: data.images,
            score: data.score
        }
        UpdateTaskRequest(taskToUpdate)
            .then(task => {
                if (task) {
                    dispatch(updateTaskState(task))
                } else {
                    console.log('task doesnt update')
                }
            })
    }

    const handleChange = (event, field) => {
        setReportData({ ...reportData, [field]: event.target.value })
        setIsSaved(false)
    }

    const handleSaveReport = () => {
        if (!checkErrors()) {
            const taskToUpdate = {
                _id: data._id,
                userId: data.user,
                challengeId: data.challenge._id,
                state: data.state,
                report: reportData.report,
                images: reportData.images,
                score: data.score
            }
            console.log(taskToUpdate)
            UpdateTaskRequest(taskToUpdate)
                .then(task => {
                    if (task) {
                        dispatch(updateReport(reportData))
                        setIsSaved(true)
                        setExpanded(!expanded)
                    } else {
                        console.log('task doesnt update')
                    }
                })
        } else {
            console.log('errors')
        }
    }

    const checkErrors = () => {
        let error = {}
        const detectErrors = Object.keys(reportData).map(key => {
            if (reportData[key].length === 0) {
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
            return true
        } else {
            setErrors(error)
            return false
        }
    }

    return (
        <Card className={styles.background}>
            <CardMedia
                component="img"
                alt="task image"
                height="180"
                image={data.challenge.image}
                title="Task"
            />
            <CardContent>
                <Typography color="textSecondary" gutterBottom variant="h6" component="h2">
                    {data.challenge.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {data.challenge.description}
                </Typography>
                <div className={styles.challengeInfo}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Максимальный бал: ${data.challenge.maxScore}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Твой бал: ${data.score}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Истекает: ${parseDate(data.challenge.finishDate)}`}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button
                    disabled={data.state !== "InProgress" || (!data.report || !data.images ||data.report.length === 0 || data.images.length === 0)}
                    onClick={handleCompleteTask}
                    className={styles.acceptButton}
                    variant="contained"
                    color="secondary">
                    {data.state !== "InProgress" ? `${taskState[data.state]}` : 'Завершить челлендж'}
                </Button>
                <IconButton
                    className={clsx(styles.expand, {
                        [styles.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={styles.reportBackground}>
                    <TextField
                        disabled={data.state !== "InProgress"}
                        color="secondary"
                        id="task-report"
                        label="Описание"
                        multiline
                        onChange={(e) => handleChange(e, 'report')}
                        error={errors.report}
                        value={reportData.report}
                        helperText={errors.report && 'Поле не должно быть пустым'}
                    />
                    <Button
                        onClick={handleSaveReport}
                        className={styles.saveReportButton}
                        variant="contained"
                        color="secondary"
                        disabled={isSave || data.state !== "InProgress"}>
                        Сохранить
                    </Button>
                </CardContent>
            </Collapse>
        </Card>
    )
}