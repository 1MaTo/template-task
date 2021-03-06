import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/Challenge.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AcceptChallengeRequest } from '../../requests/Request'
import { addTask } from '../../redux/reducers/tasksSlice';
import { addChallengeToQueue, clearPandingQueue } from '../../redux/reducers/challengesSlice';
import { setOnlineStatus } from '../../redux/reducers/userSlice';

export const Challenge = ({ data }) => {

    const parseDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }

    const dispatch = useDispatch()

    const isPending = useSelector(state => state.challenges.pendingQueue && state.challenges.pendingQueue.indexOf(data._id) !== -1)

    const userId = useSelector(state => state.user.user._id)
    const acceptedChallenges = useSelector(
        state => state.tasks.elements.map(task => {
            if (task.state !== "Cancelled") {
                return task.challenge._id
            }
        }))

    const handleAcceptChallenge = () => {
        //dispatch(addTask({ _id: Date.now(), user: userId, state: "InProgress", score: 0, challenge: data, report: '', images: [] }))
        AcceptChallengeRequest({
            challengeId: data._id,
            userId: userId
        }).then(task => {
            if (typeof task === "object") {
                dispatch(addTask({ ...task, score: 0, challenge: data, report: '', images: [] }))
                clearPandingQueue(true)
            } else {
                if (typeof task === "string" && task === "offline") {
                    dispatch(addChallengeToQueue(data._id))
                    dispatch(setOnlineStatus(false))
                } else {
                    dispatch(setOnlineStatus(true))
                    clearPandingQueue()
                }
                console.log('err to add task')
            }
        })
    }

    return (
        <Card className={styles.background}>
            <CardMedia
                component="img"
                alt="task image"
                height="180"
                image={data.image}
                title="Task"
            />
            <CardContent>
                <Typography color="textSecondary" gutterBottom variant="h6" component="h2">
                    {data.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {data.description}
                </Typography>
                <div className={styles.challengeInfo}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Очки: ${data.maxScore}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Истекает: ${parseDate(data.finishDate)}`}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleAcceptChallenge}
                    className={styles.acceptButton}
                    variant="contained"
                    color="secondary"
                    disabled={isPending || acceptedChallenges.indexOf(data._id) !== -1}>
                    {isPending ? 'Челендж будет взят при подключении к интернету' : acceptedChallenges.indexOf(data._id) === -1 ?
                        'Принять челендж' : 'Вы уже взяли этот челендж'}
                </Button>
            </CardActions>
        </Card>
    )
}