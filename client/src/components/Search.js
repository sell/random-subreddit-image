import React from "react";
import Axios from "axios";
import '../index.css';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

class Search extends React.Component{

    constructor(props) {
        super( props );

        this.state = {
            subreddit: '',
            results: {},
            loading: false,
            message: ''
        }

        this.cancel = '';

    }

    fetchSearchResults = ( subreddit, imageOnly = false ) => {
        const ImageOnly = !imageOnly
        const searchUrl = `http://localhost:5000/api/reddit?subreddit=${subreddit}&imageOnly=${imageOnly}`;

        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = Axios.CancelToken.source();

        Axios.get(searchUrl, {
            cancelToken: this.cancel.token
        }).then(res => {
            const results = res.data;

            const resultsNotFound = !results ? 'Couldn\'t find any results, please try again' : '';

            this.setState({
                results,
                message: resultsNotFound,
                loading: false
            })

            console.log(results)
        }).catch(e => {
            if (Axios.isCancel(e) || e) {
                this.setState({ loading: false, message: 'Failed to fetch the data'})
            }
        })

    }

    handleOnInputChange = (e) => {

        const subreddit = e.target.value;

        if (!subreddit) {
            this.setState( { subreddit, results: {}, message: ''} );
        } else {
            this.setState({ subreddit, loading: true, message: '' }, () => {
                this.fetchSearchResults(subreddit);
            })
        }

    };

    renderSearchResults = () => {
        const { results } = this.state;

        console.log(Object.keys(results).length)

        if (Object.keys(results).length === 0) {
            return (
                <div className={"results__container"}>
                    <p>not found</p>
                </div>
            )
        }

        if (results.status === 404) {
            return (
                <div className={"results__container"}>
                    <p>{results.err}</p>
                </div>
            )
        }

        if (results.data && Object.keys(results).length && Object.keys(results.data).length) {

            return (
                <div className={"results__container"}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" >
                                    {results.data.data.author.slice(0, 1)}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={results.data.data.title}
                            subheader={moment.unix(results.data.data.created).format('LLLL')}
                        />
                        <CardMedia
                            image={results.data.data.url}
                            style={{ height: '400px'}}
                            title="Reddit Image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                🔼{results.data.data.ups} / 🔽{results.data.data.downs}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <a href={`https://reddit.com${results.data.data.permalink}`} target={'_blank'}>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </a>
                        </CardActions>
                    </Card>
                    <img height={600} width={'100%'} src={results.data.data.url} alt={"reddit image"} />
                </div>
            )
        }
    }

    render() {
        const { subreddit, loading, message } = this.state;

        return (
            <div className={"container"}>
               <h2 className={"searchHeading"}>Search any Subreddit you want</h2>
                {/*<label htmlFor={"searchInput"} className={"searchInput"}>Search</label>*/}
                <TextField label="Search Reddit" variant="outlined" name={"subreddit"} value={subreddit} onChange={this.handleOnInputChange} type={"text"} id={"searchInput"} placeholder={"search a reddit"}/>
                {message && <p>{ message }</p>}
                {loading && <p>Loading</p> }
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default Search;